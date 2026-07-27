import json
import os
import requests

with open('/Users/qinyong/Desktop/work/shuguang/github/fxjc/fxjc/scripts/all_slices.json', 'r', encoding='utf-8') as f:
    all_slices = json.load(f)

output_dir = '/Users/qinyong/Desktop/work/shuguang/github/fxjc/fxjc/src/assets/images/home/'
os.makedirs(output_dir, exist_ok=True)

downloaded_count = 0
skipped_count = 0

for idx, slice_info in enumerate(all_slices[9:], start=10):
    name = slice_info['name']
    download_url = slice_info['download_url']
    
    base_name = name
    if '/' in base_name:
        base_name = base_name.split('/')[-1]
    if not base_name.endswith('.png'):
        base_name += '.png'
    
    filename = f"{idx:02d}_{base_name}"
    filepath = os.path.join(output_dir, filename)
    
    if os.path.exists(filepath):
        print(f"跳过: {filename}")
        skipped_count += 1
        continue
    
    try:
        print(f"下载: {filename}")
        response = requests.get(download_url, timeout=30)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        downloaded_count += 1
        print(f"成功: {filename}")
    except Exception as e:
        print(f"失败: {filename} - {str(e)}")

print(f"\n下载完成！成功: {downloaded_count}, 跳过: {skipped_count}")
