const CardPriority = {
    FRESH: 'fresh',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
};

export const sampleCards = [
    {
        id: 1,
        priority: CardPriority.FRESH,
        term: 'Wasser',
        translation: 'shui',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 2,
        priority: CardPriority.FRESH,
        term: 'lieben',
        translation: 'ai',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 3,
        priority: CardPriority.FRESH,
        term: 'sich unterhalten',
        translation: 'tiaolian',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 4,
        priority: CardPriority.FRESH,
        term: 'kennenlernen',
        translation: 'renshi',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 5,
        priority: CardPriority.HIGH,
        term: 'Taxi',
        translation: 'chuzuche',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 6,
        priority: CardPriority.HIGH,
        term: 'Regen',
        translation: 'xiayu',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 7,
        priority: CardPriority.HIGH,
        term: 'Ärztin',
        translation: 'yisheng',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 8,
        priority: CardPriority.MEDIUM,
        term: 'Park',
        translation: 'gongyuan',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 9,
        priority: CardPriority.MEDIUM,
        term: 'Apfel',
        translation: 'pingguo',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    },
    {
        id: 10,
        priority: CardPriority.LOW,
        term: 'neu',
        translation: 'xin',
        lastSeenAt: Date.now() - Math.round(Math.random() * 10000)
    }
];