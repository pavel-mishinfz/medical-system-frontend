export function getDiaryItems(diaryData) {

    const items = [
        { 
            title: 'Пульс', 
            body: diaryData.pulse + ' уд/мин', 
            fields: [
                {
                    title: 'уд/мин',
                    type: 'text',
                    name: 'pulse',
                    value: diaryData.pulse
                }
            ]
        },
        { 
            title: 'Температура', 
            body: diaryData.temperature + ' °С', 
            fields: [
                {
                    title: '°С',
                    type: 'text',
                    name: 'temperature',
                    value: diaryData.temperature
                }
            ]
        },
        { 
            title: 'Систолическое артериальное давление (верхнее)', 
            body: diaryData.upper_pressure + ' мм рт. ст.', 
            fields: [
                {
                    title: 'мм рт. ст.',
                    type: 'text',
                    name: 'upper_pressure',
                    value: diaryData.upper_pressure
                }
            ]
        },
        { 
            title: 'Диастолическое артериальное давление (нижнее)', 
            body: diaryData.lower_pressure + ' мм рт. ст.', 
            fields: [
                {
                    title: 'мм рт. ст.',
                    type: 'text',
                    name: 'lower_pressure',
                    value: diaryData.lower_pressure
                }
            ]
        },
        { 
            title: 'Уровень кислорода в крови', 
            body: diaryData.oxygen_level ? diaryData.oxygen_level + ' %' : '', 
            fields: [
                {
                    title: '%',
                    type: 'text',
                    name: 'oxygen_level',
                    value: diaryData.oxygen_level
                }
            ]
        },
        { 
            title: 'Уровень сахара в крови', 
            body: diaryData.sugar_level ? diaryData.sugar_level + ' ммоль/л' : '', 
            fields: [
                {
                    title: 'ммоль/л',
                    type: 'text',
                    name: 'sugar_level',
                    value: diaryData.sugar_level
                }
            ]
        },
        { 
            title: 'Комментарий', 
            body: diaryData.comment ? diaryData.comment : '', 
            fields: [
                {
                    title: null,
                    type: 'textarea',
                    name: 'comment',
                    value: diaryData.comment
                }
            ]
        },
    ];

  return items;
}