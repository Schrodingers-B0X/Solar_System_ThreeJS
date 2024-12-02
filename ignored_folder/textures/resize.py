from PIL import Image
import os

# Define the folder containing the images
input_folder = "./"  # Replace with your folder path

# Set the target dimensions
target_size = (1024, 512)

# Iterate over all files in the folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith(".jpg"):  # Process only JPG files
        file_path = os.path.join(input_folder, filename)
        
        # Open the image
        with Image.open(file_path) as img:
            # Resize the image using LANCZOS resampling
            resized_img = img.resize(target_size, Image.Resampling.LANCZOS)
            
            # Create a new name for the resized image
            new_name = f"resized_{filename}"
            new_path = os.path.join(input_folder, new_name)
            
            # Save the resized image
            resized_img.save(new_path, "JPEG")
            print(f"Resized and saved: {new_name}")
