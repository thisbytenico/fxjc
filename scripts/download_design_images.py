import requests
import os

image_mapping = {
    "./assets/slices/bd4.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8677d5c5edd860155fe9759464057c03476c4d59de701617bb78b6af9f43def3",
    "./assets/slices/box1.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1c2176502fe30c60b1bd1d1f35825f589f607a071620192355b1082f5c8137b0",
    "./assets/slices/box3.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng514a82242674d4495e840560553e646e2e7f9eb15f76e057d24e0677086c9d61",
    "./assets/slices/group1.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng152e8c172c5d419841c30feec668f6bb5b906d659663c7b46909c04bcd5b0d93",
    "./assets/slices/group2.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng29e7cfc9612c44a435caa33d71ce98cd22388a18cce6f834847465dbe593a065",
    "./assets/slices/layer6.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7e1b6e34968a919d6871d6cafd082734e6a543a2ef2fe2347432fdc9fd5640e2",
    "./assets/slices/block1.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng508c27aff82bb9edb20a64e920c32256a46136c64d5322a2c8a7e1a780e701bf",
    "./assets/slices/block2.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng95fa1cf52ae8cc7301b7817715b33d0809f31ba884328403e486c1b6ff126682",
    "./assets/slices/section3.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge947a94a194e74d18fa1c14b3d5c32fb6bb237bf299d1c3591ee5151f0e2afec",
    "./assets/slices/mod2.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5e54d8e766841340438357275c90e898a8171dc7a3a20c79b1162c1ec52b6884",
    "./assets/slices/box6.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng633d0340d5955020ecb63a98587f448e6ab6d6a3c6201d143c5ceb6b090b29b2",
    "./assets/slices/section10.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng4eb2c1e0a1ffc83f9a824c9a9d278131784f1acddf629e2fe2e08c3491c86f90",
    "./assets/slices/layer5.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga28e89f9766daa0aeb00c5e59d4a33bd9571561493324771ee71e362aae8d00f",
    "./assets/slices/box8.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge9979b6b5264f42e4e40d94c622b14a7dc13749c9a5b3e24db0b801a29b1b3ab",
    "./assets/slices/block4.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc29e11b0866cd9f43c686b5a1034aeff2955d1991a69cb55fd7700e5f067d220",
    "./assets/slices/bd5.png": "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng982bd7f252ed8faec653c105abdf3a3c933c527bbf68106482ba78954f855a35"
}

output_dir = '/Users/qinyong/Desktop/work/shuguang/github/fxjc/fxjc/src/assets/slices/'
os.makedirs(output_dir, exist_ok=True)

downloaded_count = 0
for local_path, remote_url in image_mapping.items():
    filename = os.path.basename(local_path)
    filepath = os.path.join(output_dir, filename)
    
    if os.path.exists(filepath):
        print(f"跳过: {filename}")
        continue
    
    try:
        print(f"下载: {filename}")
        response = requests.get(remote_url, timeout=30)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        downloaded_count += 1
        print(f"成功: {filename}")
    except Exception as e:
        print(f"失败: {filename} - {str(e)}")

print(f"\n下载完成！成功: {downloaded_count}")
