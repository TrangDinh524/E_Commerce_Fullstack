import pandas as pd
import os
import csv
import re
import hashlib
from datetime import datetime

def clean_text(text):
    if pd.isna(text) or text == '' or text is None or str(text).lower() == 'nan':
        return ''
    text = str(text)
    text = text.replace('\n', '')
    text = text.replace('\r', '')
    text = text.replace('"', '""')
    text = re.sub(r'\s+', ' ', text) 
    return text.strip()

def safe_int(value, default=0):
    """Safely convert value to int"""
    if pd.isna(value) or value == '' or value is None or str(value).lower() == 'nan':
        return default
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

def safe_float(value, default=0.0):
    """Safely convert value to float"""
    if pd.isna(value) or value == '' or value is None or str(value).lower() == 'nan':
        return default
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def parse_js_date(date_str):
    """Parse JavaScript date string to MySQL datetime format"""
    if pd.isna(date_str) or date_str == '' or str(date_str).lower() == 'nan':
        return ''
    
    try:
        # Remove the GMT+0000 () part and parse
        date_str = str(date_str).replace(' GMT+0000 ()', '')
        # Parse the date
        dt = datetime.strptime(date_str, '%a %b %d %Y %H:%M:%S')
        return dt.strftime('%Y-%m-%d %H:%M:%S')
    except:
        return ''

def generate_seller_id(seller_name, seen_sellers):
    """
    Generate a unique seller_id for sellers that don't have one.
    Uses seller_name to create a consistent ID and tracks seen sellers.
    """
    print("calling generate_seller_id")
    # Create a hash-based ID from seller_name for consistency
    seller_hash = hashlib.md5(seller_name.encode('utf-8')).hexdigest()[:8]
    generated_id = seller_hash
    
    # If this generated ID already exists, append a counter
    if generated_id in seen_sellers:
        counter = 1
        while f"{generated_id}_{counter}" in seen_sellers:
            counter += 1
        generated_id = f"{generated_id}_{counter}"
        
    return generated_id

def process_products_data(input_file, output_dir):
    df = pd.read_csv(input_file, nrows=20)
    df.to_csv("raw/Shopee - products.csv", index=False)

    products_data = []
    sellers_data = []

    seen_sellers = set()

    for i, row in df.iterrows():
        try:
            # Extract seller info
            seller_id = clean_text(row.get('seller_id', None))
            seller_name = clean_text(row.get('seller_name', None))
            shop_url = clean_text(row.get('shop_url', None))
            seller_rating = safe_float(row.get('seller_rating', 0.0))
            seller_products = safe_int(row.get('seller_products', 0))
            seller_followers = safe_int(row.get('seller_followers', 0))
            seller_chats_responded_percentage = safe_int(row.get('seller_chats_responded_percentage', 0))
            seller_chat_time_reply = clean_text(row.get('seller_chat_time_reply', None))
            seller_joined_date = parse_js_date(row.get('seller_joined_date', None))

            # Skip rows where both seller_id and seller_name are empty
            # print("seller_id before", seller_id)
            if not seller_id and not seller_name:
                continue

            # Generate seller_id if it's empty and seller_name exists
            if seller_name and not seller_id:
                seller_id = generate_seller_id(seller_name, seen_sellers)
            #     print("seller_id after generate_seller_id", seller_id)
            # print("expect True", seller_id not in seen_sellers)
            # print("seen_sellers", seen_sellers)  
            if seller_id not in seen_sellers:
                # print("seller_id not in seen_sellers", seller_id)
                sellers_data.append({
                    'seller_id': seller_id,
                    'seller_name': seller_name,
                    'shop_url': shop_url,
                    'seller_rating': seller_rating,
                    'seller_products': seller_products,
                    'seller_followers': seller_followers,
                    'seller_chats_responded_percentage': seller_chats_responded_percentage,
                    'seller_chat_time_reply': seller_chat_time_reply,
                    'seller_joined_date': seller_joined_date,
                })
                seen_sellers.add(seller_id)

            # Extract product info
            product = {
                'id': clean_text(row.get('id', '')),
                'url': clean_text(row.get('url', None)),
                'title': clean_text(row.get('title', None)),
                'sold': safe_int(row.get('sold', 0)),
                'rating': safe_float(row.get('rating', 0.0)),
                'reviews': safe_int(row.get('reviews', 0)),
                'initial_price': safe_float(row.get('initial_price', 0.0)),
                'final_price': safe_float(row.get('final_price', 0.0)),
                'currency': clean_text(row.get('currency', None)),
                'stock': safe_int(row.get('stock', 0)),
                'image': clean_text(row.get('image', None)),
                'video': clean_text(row.get('video', None)),
                'breadcrumb': clean_text(row.get('breadcrumb', None)),
                'product_specifications': clean_text(row.get('Product Specifications', None)),  # Fixed column name
                'product_description': clean_text(row.get('Product Description', None)),  # Fixed column name
                'category_id': safe_int(row.get('category_id', 0)),
                'flash_sale': safe_int(row.get('flash_sale', 0)),
                'flash_sale_time': clean_text(row.get('flash_sale_time', None)),
                'product_variation': clean_text(row.get('product_variation', None)),
                'gmv_cal': safe_float(row.get('gmv_cal', 0.0)),
                'category_url': clean_text(row.get('category_url', None)),
                'vouchers': clean_text(row.get('vouchers', None)),
                'is_available': safe_int(row.get('is_available', 0)),
                'product_ratings': safe_float(row.get('product_ratings', 0.0)),
                'seller_id': seller_id,
            }
            # print("product details",product['id'], product['seller_id'])
            
            products_data.append(product)

        except Exception as e:
            print(f"Error processing row {i}: {str(e)}")
            continue
    # Create DataFrames
    products_df = pd.DataFrame(products_data)
    sellers_df = pd.DataFrame(sellers_data)

    # Save processed data
    os.makedirs(output_dir, exist_ok=True)

    products_df.to_csv(f"{output_dir}/products.csv", index=False, quoting=csv.QUOTE_ALL)
    sellers_df.to_csv(f"{output_dir}/sellers.csv", index=False, quoting=csv.QUOTE_ALL)
    print(f"\n=== Preprocess Processing Complete ===")
    print(f"Products: {len(products_data)}")
    print(f"Sellers: {len(sellers_data)}")
    print(f"Files saved to: {output_dir}")

    return products_df, sellers_df  

if __name__ == "__main__":
    input_file = "raw/Shopee - products.csv"
    output_dir = "processed"

    products_df, sellers_df = process_products_data(input_file, output_dir)
    
    print("\n=== Sample Data ===")
    print("Products:")
    print(products_df[['id', 'title', 'final_price', 'seller_id', 'breadcrumb']].head(3))
    print("\nSellers:")
    if not sellers_df.empty:
        print(sellers_df[['seller_id', 'seller_name', 'seller_rating']].head(3))