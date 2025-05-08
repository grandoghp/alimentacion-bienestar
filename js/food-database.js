// Base de datos de alimentos para BodyRun

const foodDatabase = {
    // Proteínas
    proteins: [
        {
            name: 'Pollo (pechuga, sin piel)',
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6,
            portion: '100g'
        },
        {
            name: 'Atún (en agua)',
            calories: 109,
            protein: 24,
            carbs: 0,
            fat: 0.8,
            portion: '100g'
        },
        {
            name: 'Huevo entero',
            calories: 72,
            protein: 6.3,
            carbs: 0.4,
            fat: 5,
            portion: '1 unidad (50g)'
        },
        {
            name: 'Carne de res (magra)',
            calories: 250,
            protein: 26,
            carbs: 0,
            fat: 15,
            portion: '100g'
        },
        {
            name: 'Tofu',
            calories: 76,
            protein: 8,
            carbs: 2,
            fat: 4.5,
            portion: '100g'
        }
    ],
    
    // Carbohidratos
    carbs: [
        {
            name: 'Arroz blanco (cocido)',
            calories: 130,
            protein: 2.7,
            carbs: 28,
            fat: 0.3,
            portion: '100g'
        },
        {
            name: 'Pan integral',
            calories: 80,
            protein: 4,
            carbs: 15,
            fat: 1,
            portion: '1 rebanada (30g)'
        },
        {
            name: 'Avena (cruda)',
            calories: 389,
            protein: 16.9,
            carbs: 66.3,
            fat: 6.9,
            portion: '100g'
        },
        {
            name: 'Papa (cocida)',
            calories: 87,
            protein: 1.9,
            carbs: 20.1,
            fat: 0.1,
            portion: '100g'
        },
        {
            name: 'Pasta (cocida)',
            calories: 158,
            protein: 5.8,
            carbs: 31,
            fat: 0.9,
            portion: '100g'
        }
    ],
    
    // Grasas saludables
    fats: [
        {
            name: 'Aguacate',
            calories: 160,
            protein: 2,
            carbs: 8.5,
            fat: 14.7,
            portion: '1/2 unidad (100g)'
        },
        {
            name: 'Aceite de oliva',
            calories: 119,
            protein: 0,
            carbs: 0,
            fat: 13.5,
            portion: '1 cucharada (15ml)'
        },
        {
            name: 'Nueces',
            calories: 185,
            protein: 4.3,
            carbs: 3.9,
            fat: 18.5,
            portion: '30g'
        },
        {
            name: 'Almendras',
            calories: 164,
            protein: 6,
            carbs: 6.1,
            fat: 14.2,
            portion: '30g'
        },
        {
            name: 'Semillas de chía',
            calories: 137,
            protein: 4.4,
            carbs: 12.3,
            fat: 8.6,
            portion: '30g'
        }
    ],
    
    // Frutas
    fruits: [
        {
            name: 'Plátano',
            calories: 89,
            protein: 1.1,
            carbs: 22.8,
            fat: 0.3,
            portion: '1 unidad mediana (100g)'
        },
        {
            name: 'Manzana',
            calories: 52,
            protein: 0.3,
            carbs: 13.8,
            fat: 0.2,
            portion: '1 unidad mediana (100g)'
        },
        {
            name: 'Naranja',
            calories: 47,
            protein: 0.9,
            carbs: 11.8,
            fat: 0.1,
            portion: '1 unidad mediana (100g)'
        },
        {
            name: 'Fresas',
            calories: 32,
            protein: 0.7,
            carbs: 7.7,
            fat: 0.3,
            portion: '100g'
        },
        {
            name: 'Arándanos',
            calories: 57,
            protein: 0.7,
            carbs: 14.5,
            fat: 0.3,
            portion: '100g'
        }
    ],
    
    // Verduras
    vegetables: [
        {
            name: 'Brócoli',
            calories: 34,
            protein: 2.8,
            carbs: 6.6,
            fat: 0.4,
            portion: '100g'
        },
        {
            name: 'Espinaca',
            calories: 23,
            protein: 2.9,
            carbs: 3.6,
            fat: 0.4,
            portion: '100g'
        },
        {
            name: 'Zanahoria',
            calories: 41,
            protein: 0.9,
            carbs: 9.6,
            fat: 0.2,
            portion: '100g'
        },
        {
            name: 'Pimiento',
            calories: 31,
            protein: 1,
            carbs: 6,
            fat: 0.3,
            portion: '100g'
        },
        {
            name: 'Tomate',
            calories: 18,
            protein: 0.9,
            carbs: 3.9,
            fat: 0.2,
            portion: '100g'
        }
    ]
};

// Función para buscar alimentos por nombre
function searchFood(query) {
    query = query.toLowerCase();
    let results = [];
    
    // Buscar en todas las categorías
    for (let category in foodDatabase) {
        const categoryResults = foodDatabase[category].filter(food => 
            food.name.toLowerCase().includes(query)
        );
        results = [...results, ...categoryResults];
    }
    
    return results;
}

// Función para obtener alimentos por categoría
function getFoodsByCategory(category) {
    return foodDatabase[category] || [];
}

// Función para calcular calorías de una porción personalizada
function calculateCustomPortion(food, grams) {
    // Extraer el peso de la porción estándar
    const standardPortion = food.portion;
    let standardGrams = 100; // Valor predeterminado
    
    if (standardPortion.includes('g')) {
        const match = standardPortion.match(/(\d+)g/);
        if (match && match[1]) {
            standardGrams = parseInt(match[1]);
        }
    } else if (standardPortion.includes('unidad')) {
        const match = standardPortion.match(/(\d+)g/);
        if (match && match[1]) {
            standardGrams = parseInt(match[1]);
        }
    }
    
    // Calcular valores nutricionales para la porción personalizada
    const ratio = grams / standardGrams;
    return {
        calories: Math.round(food.calories * ratio),
        protein: Math.round(food.protein * ratio * 10) / 10,
        carbs: Math.round(food.carbs * ratio * 10) / 10,
        fat: Math.round(food.fat * ratio * 10) / 10
    };
}