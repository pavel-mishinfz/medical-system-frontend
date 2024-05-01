import moment from "moment";


export function getMedcardItems(cardData, familyStatusList, educationList, busynessList) {

    const items = [
        { 
            title: 'ФИО', 
            body: `${cardData.surname} ${cardData.name} ${cardData.patronymic ? cardData.patronymic : ''}`, 
            fields: [
                {
                    title: 'Фамилия',
                    type: 'text',
                    name: 'surname',
                    value: cardData.surname
                },
                {
                    title: 'Имя',
                    type: 'text',
                    name: 'name',
                    value: cardData.name
                },
                {
                    title: 'Отчество',
                    type: 'text',
                    name: 'patronymic',
                    value: cardData.patronymic
                }
            ]
        },
        { 
            title: 'Пол', 
            body: cardData.is_man ? 'мужской' : 'женский',
            fields: [
                {
                    title: null,
                    type: 'select',
                    name: 'is_man',
                    value: cardData.is_man,
                    options: [
                        {id: 0, name: 'женский'},
                        {id: 1, name: 'мужской'}
                    ]
                }
            ]
        },
        { 
            title: 'Дата рождения', 
            body: moment(cardData.birthday).utc(true).format('DD/MM/YYYY'),
            fields: [
                {
                    title: null,
                    type: 'date',
                    name: 'birthday',
                    value: cardData.birthday
                }
            ]
        },
        { 
            title: 'Адрес', 
            body: `${cardData.address.subject ? cardData.address.subject + ', ' : ''} 
            ${cardData.address.district ? cardData.address.district + ', ' : ''}
            ${cardData.address.locality + ', '}
            ${cardData.address.street + ', '}
            ${cardData.address.house + ', '}
            ${cardData.address.apartment ? cardData.address.apartment : ''}`, 
            fields: [
                {
                    title: 'Субъект',
                    type: 'text',
                    name: 'address',
                    subname: 'subject',
                    value: cardData.address.subject
                },
                {
                    title: 'Район',
                    type: 'text',
                    name: 'address',
                    subname: 'district',
                    value: cardData.address.district
                },
                {
                    title: 'Город/Населенный пункт',
                    type: 'text',
                    name: 'address',
                    subname: 'locality',
                    value: cardData.address.locality
                },
                {
                    title: 'Улица',
                    type: 'text',
                    name: 'address',
                    subname: 'street',
                    value: cardData.address.street
                },
                {
                    title: 'Дом',
                    type: 'text',
                    name: 'address',
                    subname: 'house',
                    value: cardData.address.house
                },
                {
                    title: 'Квартира',
                    type: 'text',
                    name: 'address',
                    subname: 'apartment',
                    value: cardData.address.apartment
                }
            ]
        },
        { 
            title: 'Телефон', 
            body: cardData.phone,
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'phone',
                    value: cardData.phone
                }
            ]
        },
        { 
            title: 'Местность', 
            body: cardData.is_urban_area ? 'сельская' : 'городская',
            fields: [
                {
                    title: null,
                    type: 'select',
                    name: 'is_urban_area',
                    value: cardData.is_urban_area,
                    options: [
                        {id: 0, name: 'городская'},
                        {id: 1, name: 'сельская'}
                    ]
                }
            ]
        },
        { 
            title: 'Номер полиса', 
            body: cardData.number_policy,
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'number_policy',
                    value: cardData.number_policy
                }
            ]
        },
        { 
            title: 'СНИЛС', 
            body: cardData.snils,
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'snils',
                    value: cardData.snils,
                }
            ]
        },
        { 
            title: 'Страховая компания', 
            body: cardData.insurance_company,
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'insurance_company',
                    value: cardData.insurance_company,
                }
            ]
        },
        { 
            title: 'Код категории лояльности', 
            body: cardData.benefit_category_code ? cardData.benefit_category_code : '',
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'benefit_category_code',
                    value: cardData.benefit_category_code ? cardData.benefit_category_code : ''
                }
            ]
        },
        { 
            title: 'Паспорт', 
            body: `${cardData.passport.series} ${cardData.passport.number}`,
            fields: [
                {
                    title: 'Серия',
                    type: 'text',
                    name: 'passport',
                    subname: 'series',
                    value: cardData.passport.series
                },
                {
                    title: 'Номер',
                    type: 'text',
                    name: 'passport',
                    subname: 'number',
                    value: cardData.passport.number
                }
            ]
        },
        { 
            title: 'Семейное положение', 
            body: cardData.family_status.name,
            fields: [
                {
                    title: null,
                    type: 'select',
                    name: 'id_family_status',
                    value: cardData.family_status.id,
                    options: familyStatusList.map(status => {
                        return {id: status.id, name: status.name}
                    }),
                }
            ]
        },
        { 
            title: 'Образование', 
            body: cardData.education.name,
            fields: [
                {
                    title: null,
                    type: 'select',
                    name: 'id_education',
                    value: cardData.education.id,
                    options: educationList.map(education => {
                        return {id: education.id, name: education.name}
                    })
                }
            ]
        },
        { 
            title: 'Занятость', 
            body: cardData.busyness.name,
            fields: [
                {
                    title: null,
                    type: 'select',
                    name: 'id_busyness',
                    value: cardData.busyness.id,
                    options: busynessList.map(busyness => {
                        return {id: busyness.id, name: busyness.name}
                    })
                }
            ]
        },
        { 
            title: 'Инвалидность', 
            body: cardData.disability && `${cardData.disability.name ? cardData.disability.name + ', ' : ''}
            ${cardData.disability.group ? cardData.disability.group + ', ' : ''} 
            ${cardData.disability.create_date ? moment(cardData.disability.create_date).utc(true).format('DD/MM/YYYY') + ', ' : ''}`,
            fields: [
                {
                    title: 'Наименование',
                    type: 'text',
                    name: 'disability',
                    subname: 'name',
                    value: cardData.disability ? cardData.disability.name : ''
                },
                {
                    title: 'Группа',
                    type: 'text',
                    name: 'disability',
                    subname: 'group',
                    value: cardData.disability ? cardData.disability.group : ''
                },
                {
                    title: 'Дата',
                    type: 'date',
                    name: 'disability',
                    subname: 'create_date',
                    value: cardData.disability ? cardData.disability.create_date : ''
                }
            ]
        },
        { 
            title: 'Место работы', 
            body: cardData.workplace ? cardData.workplace : '',
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'workplace',
                    value: cardData.workplace ? cardData.workplace : ''
                }
            ]
        },
        { 
            title: 'Должность', 
            body: cardData.job ? cardData.job : '',
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'job',
                    value: cardData.job ? cardData.job : ''
                }
            ]
        },
        { 
            title: 'Группа крови', 
            body: cardData.blood_type ? cardData.blood_type : '',
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'blood_type',
                    value: cardData.blood_type ? cardData.blood_type : ''
                }
            ]
        },
        { 
            title: 'Резус-фактор', 
            body: `${cardData.blood_type && (cardData.rh_factor_is_pos ? 'положительный' : 'отрицательный')}`,
            fields: [
                {
                    title: null,
                    type: 'select',
                    name: 'rh_factor_is_pos',
                    value: cardData.rh_factor_is_pos,
                    options: [
                        {id: 0, name: 'отрицательный'},
                        {id: 1, name: 'положительный'}
                    ]
                }
            ]
        },
        { 
            title: 'Аллергия', 
            body: cardData.allergy ? cardData.allergy : '',
            fields: [
                {
                    title: null,
                    type: 'text',
                    name: 'allergy',
                    value: cardData.allergy ? cardData.allergy : ''
                }
            ]
        }
    ];

  return items;
}