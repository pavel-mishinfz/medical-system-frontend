export function getNewMedicalCard(familyStatus, education, busyness) {
    return {
        name: "",
        surname: "",
        patronymic: "",
        is_man: true,
        birthday: "",
        address: {
            subject: "",
            district: "",
            locality: "",
            street: "",
            house: 0,
            apartment: 0
        },
        phone: "",
        is_urban_area: true,
        number_policy: "",
        snils: "",
        insurance_company: "",
        benefit_category_code: "",
        passport: {
            series: "",
            number: ""
        },
        id_family_status: 1,
        id_education: 1,
        id_busyness: 1,
        workplace: "",
        job: "",
        blood_type: "",
        rh_factor_is_pos: true,
        allergy: ""
    }
}