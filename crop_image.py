
from PIL import Image
import sys
import os

def crop_transparency(image_path, output_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Get bounding box of non-transparent pixels
        bbox = img.getbbox()
        
        if bbox:
            cropped_img = img.crop(bbox)
            # Add a small padding if needed, or just save as is for max zoom
            cropped_img.save(output_path)
            print(f"Successfully cropped {image_path} to {output_path}")
        else:
            print("Image is fully transparent.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Input file is logo.png (assumed to be the source)
    # Output file will be logo_cropped.png
    crop_transparency("public/logo.png", "public/logo_cropped.png")
