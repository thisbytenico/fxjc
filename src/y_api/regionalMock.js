const REGION_SCALE = { province: .06, city: .014, district: .003 };

const hash = value => {
    let result = 0;
    for (const character of value) result = (Math.imul(result, 31) + character.codePointAt(0)) >>> 0;
    return result;
};

export const mockRegionMapValues = ({ adcode, name, regionNames = [] }) => regionNames.map(regionName => ({
    name: regionName,
    value: 18 + hash(`${adcode}:${name}:${regionName}`) % 240
}));

export const createRegionalMock = ({ current, regionNames = [] }) => {
    const seed = hash(`${current.level}:${current.adcode}:${current.name}`);
    const scale = REGION_SCALE[current.level] * (.75 + (seed % 61) / 100);
    const count = (value, index = 0) => value > 0
        ? Math.max(1, Math.round(value * scale * (.85 + ((seed + index * 17) % 31) / 100)))
        : 0;
    const rate = (value, index = 0, min = 0) => {
        const offset = (1 + (seed + index * 7) % 28) / 10;
        const signedOffset = (seed + index) % 2 ? offset : -offset;
        return Number(Math.max(min, Math.min(100, value + signedOffset)).toFixed(1));
    };
    const values = items => items.map((item, index) => ({ ...item, value: count(item.value, index) }));
    const names = [...new Set(regionNames.length ? regionNames : [current.name])];
    const rank = (items, toRow, key = 'value') => items.length
        ? names.map((name, index) => toRow({ ...items[index % items.length], name }, index))
            .sort((left, right) => right[key] - left[key]).slice(0, items.length)
        : [];

    return { count, rate, values, rank, seed };
};
