import asyncio
import sys
import json

sys.path.insert(0, '/Users/qinyong/Desktop/work/lanhu-mcp/lanhu-mcp')
from lanhu_mcp_server import LanhuExtractor, _get_designs_internal

async def get_slices():
    extractor = LanhuExtractor()
    try:
        designs = await _get_designs_internal(extractor, 'https://lanhuapp.com/web/#/item/project/detailDetach?tid=234b9939-2f7c-4602-a24d-e6a8d0d76bd3&pid=5d553872-f10b-4d9d-ad43-956be5fe2a32')
        for d in designs.get('designs', []):
            if '首页' in d['name']:
                print(f'Found design: {d["name"]} (id: {d["id"]})')
                slices = await extractor.get_design_slices_info(
                    image_id=d['id'], 
                    team_id='234b9939-2f7c-4602-a24d-e6a8d0d76bd3', 
                    project_id='5d553872-f10b-4d9d-ad43-956be5fe2a32', 
                    include_metadata=False
                )
                print(f'Total slices: {len(slices["slices"])}')
                with open('/Users/qinyong/Desktop/work/shuguang/github/fxjc/fxjc/scripts/all_slices.json', 'w', encoding='utf-8') as f:
                    json.dump(slices['slices'], f, ensure_ascii=False, indent=2)
                print('Saved to all_slices.json')
    finally:
        await extractor.close()

asyncio.run(get_slices())
