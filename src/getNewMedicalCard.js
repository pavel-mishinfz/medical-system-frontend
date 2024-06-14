export function getNewMedicalCard(familyStatus, education, busyness) {
    return {
        name: "",
        surname: "",
        patronymic: null,
        is_man: true,
        birthday: "",
        address: {
            subject: null,
            district: null,
            locality: "",
            street: "",
            house: null,
            apartment: null
        },
        phone: "",
        is_urban_area: true,
        number_policy: "",
        snils: "",
        insurance_company: null,
        benefit_category_code: null,
        passport: {
            series: "",
            number: ""
        },
        id_family_status: 1,
        id_education: 1,
        id_busyness: 1,
        workplace: null,
        job: null,
        blood_type: null,
        rh_factor_is_pos: true,
        allergy: null
    }
}