import json
import os
import requests
import re

mcp_response = """{"status":"success","design_id":"63ef2e4c-1985-488c-a95c-0aeb7c80ca1d","design_name":"WebX-首页","version":"版本5","slice_scale":2,"canvas_size":{"width":360.0,"height":175.0},"total_slices":39,"slices":[{"id":"A9608166-85F3-461E-A832-F6FB95E1A491","name":"蒙版","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga233db4ecb5f4325faf0be401d5c578d35138f9d90a5c1ddb714b34efc44d595"},{"id":"A5DF40F2-5086-429E-AF75-D17E46AAC301","name":"位图","type":"bitmap","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8677d5c5edd860155fe9759464057c03476c4d59de701617bb78b6af9f43def3"},{"id":"57B0A7CB-1FD2-41C8-B131-9DFE8CB0DA61","name":"697e9045af4ad6d3cb74fcfa712bb7fee92dc9173df8-FQoD7H","type":"bitmap","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng982bd7f252ed8faec653c105abdf3a3c933c527bbf68106482ba78954f855a35"},{"id":"C0063B0C-B7E0-4162-B070-5BBD800131F7","name":"矩形","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng1c2176502fe30c60b1bd1d1f35825f589f607a071620192355b1082f5c8137b0"},{"id":"91721DB0-E2E6-4C06-95A4-DB8020F99FF0","name":"椭圆形","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngbbbc581168adbb7c4df866e1bc6099b49f6f04f2399183fb4504fd61c93ec0e7"},{"id":"C7243A48-B675-4BF9-906C-42E30D33FB66","name":"椭圆形","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngddcf7dd49966d707f430ed6b1d3b38aa0457dd866db0456da3f04f999f902b97"},{"id":"A7FACF23-44EF-4BD6-B120-DE615FB76E55","name":"形状结合","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7601005f941730e45b9374cc657fd7cdba57c2dcface627a57b4128618035611"},{"id":"2D26DD93-D13A-46E4-8C78-36E4D8135BDD","name":"路径","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8b8cc34bf21e13dbbcae1b21d986de711cd9547db5d0741504bc9af02695f7b5"},{"id":"5B5B5678-7F97-47C1-9395-704FC8BC7B89","name":"路径","type":"shape","download_url":"https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc5b457397043d8669b9ed3b7f3218b8dca677eb7ee44779c5e89c19d2dd00128"}"""

urls = re.findall(r'"download_url":"(https://lanhu\.oss-cn-beijing\.aliyuncs\.com/SketchPng[^"]+)"', mcp_response)
names = re.findall(r'"name":"([^"]+)"', mcp_response)

slices_data = []
for i in range(len(urls)):
    slices_data.append({
        "id": str(i + 1),
        "name": names[i] if i < len(names) else f"slice_{i + 1}",
        "download_url": urls[i]
    })

output_dir = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'images', 'home')
os.makedirs(output_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

success_count = 0
fail_count = 0

for i, slice_item in enumerate(slices_data, 1):
    name = slice_item.get('name', f'slice_{i}')
    url = slice_item.get('download_url', '')
    if not url:
        continue
    safe_name = re.sub(r'[\\/:*?"<>|]', '_', name)
    filename = f"{i:02d}_{safe_name}.png"
    filepath = os.path.join(output_dir, filename)
    
    try:
        print(f"[{i}/{len(slices_data)}] 正在下载: {name}")
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"  ✓ 已保存: {filename}")
        success_count += 1
    except Exception as e:
        print(f"  ✗ 下载失败: {name} - {str(e)}")
        fail_count += 1

print(f"\n下载完成！成功: {success_count}, 失败: {fail_count}")
print(f"文件保存至: {output_dir}")
