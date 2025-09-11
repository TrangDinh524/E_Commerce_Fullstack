import pandas as pd
import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error 

# Load environment variables
load_dotenv('../server/.env')

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '3306'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', ''),
            database=os.getenv('DB_NAME', 'ecommerce')
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def create_tables_if_not_exist(connection):

    cursor = connection.cursor()
    # Create sellers table
    create_sellers_table = """
    CREATE TABLE IF NOT EXISTS sellers (
        seller_id VARCHAR(50) PRIMARY KEY,
        seller_name VARCHAR(255) NOT NULL,
        shop_url TEXT,
        seller_rating DECIMAL(2,1) DEFAULT 0.0,
        seller_products INT DEFAULT 0,
        seller_followers INT DEFAULT 0,
        seller_chats_responded_percentage INT DEFAULT 0,
        seller_chat_time_reply VARCHAR(255) NOT NULL,
        seller_joined_date DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    """
    cursor.execute(create_sellers_table)
    print("Sellers table created/verified successfully")
     
    # Create products table
    create_products_table = """
    CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        url TEXT,
        title TEXT,
        sold INT DEFAULT 0,
        rating DECIMAL(2,1) DEFAULT 0.0,
        reviews INT DEFAULT 0,
        initial_price DECIMAL(10,2) DEFAULT 0.00,
        final_price DECIMAL(10,2) DEFAULT 0.00,
        currency VARCHAR(10),
        stock INT DEFAULT 0,
        image TEXT,
        video TEXT,
        breadcrumb TEXT,
        product_specifications TEXT,
        product_description TEXT,
        category_id INT DEFAULT 0,
        flash_sale TINYINT(1) DEFAULT 0,
        flash_sale_time VARCHAR(255),
        product_variation TEXT,
        gmv_cal DECIMAL(15,2) DEFAULT 0.00,
        category_url TEXT,
        vouchers TEXT,
        is_available TINYINT(1) DEFAULT 0,
        product_ratings DECIMAL(2,1) DEFAULT 0.0,
        seller_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE SET NULL
    )
    """
    cursor.execute(create_products_table)
    print("Products table created/verified successfully")
        
    connection.commit()
def clean_value(value, field_name=None):
    if field_name == 'seller_joined_date':
        if pd.isna(value) or str(value).lower() == 'nan' or value == '':
            return None
        return value

    if pd.isna(value) or str(value).lower() == 'nan':
        return ''
    return value

def import_sellers(connection, file_path):
    try:
        df = pd.read_csv(file_path)

        if df.empty:
            print("No sellers data to import")
            return
        
        cursor = connection.cursor()

        # Clear existing data
        cursor.execute("DELETE FROM sellers")

        # Insert data
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO sellers (
                seller_id, seller_name, shop_url, seller_rating, 
                seller_products, seller_followers, seller_chats_responded_percentage,
                seller_chat_time_reply, seller_joined_date
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            values = (
                clean_value(row['seller_id']),
                clean_value(row['seller_name']),
                clean_value(row['shop_url']),
                clean_value(row['seller_rating']),
                clean_value(row['seller_products']),
                clean_value(row['seller_followers']),
                clean_value(row['seller_chats_responded_percentage']),
                clean_value(row['seller_chat_time_reply']),
                clean_value(row['seller_joined_date'], 'seller_joined_date')
            )
            cursor.execute(insert_query, values)
        
        connection.commit()
        print(f"Successfully imported {len(df)} sellers")
        
    except Error as e:
        print(f"Error importing sellers: {e}")
    finally:
        if cursor:
            cursor.close()


def import_products(connection, file_path):
    try:
        df = pd.read_csv(file_path)
        
        if df.empty:
            print("No products data to import")
            return
            
        cursor = connection.cursor()
        
        # Clear existing data
        cursor.execute("DELETE FROM products")
        
        # Insert data
        for _, row in df.iterrows():
            insert_query = """
            INSERT INTO products (
                id, url, title, sold, rating, reviews, initial_price, final_price,
                currency, stock, image, video, breadcrumb, product_specifications,
                product_description, category_id, flash_sale, flash_sale_time,
                product_variation, gmv_cal, category_url, vouchers, is_available,
                product_ratings, seller_id
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            values = (
                clean_value(row['id']),
                clean_value(row['url']),
                clean_value(row['title']),
                clean_value(row['sold']),
                clean_value(row['rating']),
                clean_value(row['reviews']),
                clean_value(row['initial_price']),
                clean_value(row['final_price']),
                clean_value(row['currency'])    ,
                clean_value(row['stock']),
                clean_value(row['image']),
                clean_value(row['video']),
                clean_value(row['breadcrumb']),
                clean_value(row['product_specifications']),
                clean_value(row['product_description']),
                clean_value(row['category_id']),
                clean_value(row['flash_sale']),
                clean_value(row['flash_sale_time']),
                clean_value(row['product_variation']),
                clean_value(row['gmv_cal']),
                clean_value(row['category_url']),
                clean_value(row['vouchers']),
                clean_value(row['is_available']),
                clean_value(row['product_ratings']),
                clean_value(row['seller_id'])
            )
            
            cursor.execute(insert_query, values)
        
        connection.commit()
        print(f"Successfully imported {len(df)} products")
        
    except Error as e:
        print(f"Error importing products: {e}")
    finally:
        if cursor:
            cursor.close()

def main():
    sellers_data = "processed/sellers.csv"
    products_data = "processed/products.csv"

    connection = get_db_connection()

    if not connection:
        print("DB is not connected")
        return
    try:
        create_tables_if_not_exist(connection)

        print("Importing sellers...")
        import_sellers(connection, sellers_data)

        print("Importing products...")
        import_products(connection, products_data)

    except Exception as e:
        print(f"Error during import: {e}")
    finally:
        if connection.is_connected():
            connection.close()
            print("Database connection closed")

if __name__ == "__main__":
    main()