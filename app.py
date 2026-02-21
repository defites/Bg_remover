from flask import Flask, render_template, request, send_file
from rembg import remove
from PIL import Image
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/remove-bg", methods=["POST"])
def remove_bg():
    file = request.files["image"]

    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, "output.png")

    file.save(input_path)

    with open(input_path, "rb") as i:
        input_image = i.read()
        output_image = remove(input_image)

    with open(output_path, "wb") as o:
        o.write(output_image)

    return send_file(output_path, mimetype="image/png")

if __name__ == "__main__":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    app.run(debug=True)