// Funcionalidad principal para BodyRun

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes de Bootstrap
    initializeBootstrapComponents();
    
    // Configurar modales
    setupModals();
    
    // Configurar calculadoras
    setupCalculators();
    
    // Configurar el botón de volver arriba
    setupBackToTopButton();
    
    // Configurar el año actual en el footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Inicializar componentes de Bootstrap
function initializeBootstrapComponents() {
    // Inicializar tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Configurar modales
function setupModals() {
    // Modal de IMC
    var bmiModal = document.getElementById('bmiModal');
    var infoButton = document.getElementById('infoButton');
    var closeBtn = bmiModal.querySelector('.close');
    
    if (infoButton) {
        infoButton.addEventListener('click', function() {
            bmiModal.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            bmiModal.style.display = 'none';
        });
    }
    
    // Modal de Superávit Calórico
    var superavitModal = document.getElementById('superavitModal');
    var superavitButton = document.getElementById('superavitButton');
    var closeSuperavitModal = document.getElementById('closeSuperavitModal');
    
    if (superavitButton) {
        superavitButton.addEventListener('click', function() {
            superavitModal.style.display = 'block';
        });
    }
    
    if (closeSuperavitModal) {
        closeSuperavitModal.addEventListener('click', function() {
            superavitModal.style.display = 'none';
        });
    }
    
    // Modal de Déficit Calórico
    var deficitModal = document.getElementById('deficitModal');
    var deficitButton = document.getElementById('deficitButton');
    var closeDeficitModal = document.getElementById('closeDeficitModal');
    
    if (deficitButton) {
        deficitButton.addEventListener('click', function() {
            deficitModal.style.display = 'block';
        });
    }
    
    if (closeDeficitModal) {
        closeDeficitModal.addEventListener('click', function() {
            deficitModal.style.display = 'none';
        });
    }
    
    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', function(event) {
        if (event.target === bmiModal) {
            bmiModal.style.display = 'none';
        }
        if (event.target === superavitModal) {
            superavitModal.style.display = 'none';
        }
        if (event.target === deficitModal) {
            deficitModal.style.display = 'none';
        }
    });
    
    // Configurar selección de sexo en modales
    setupSexSelection();
}

// Configurar selección de sexo en modales
function setupSexSelection() {
    // Para superávit calórico
    var superavitSexCards = document.querySelectorAll('#superavitModal .sex-card');
    superavitSexCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Quitar selección previa
            superavitSexCards.forEach(function(c) {
                c.classList.remove('selected');
            });
            // Añadir selección actual
            this.classList.add('selected');
            // Marcar el radio button
            var radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    // Para déficit calórico
    var deficitSexCards = document.querySelectorAll('#deficitModal .sex-card');
    deficitSexCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Quitar selección previa
            deficitSexCards.forEach(function(c) {
                c.classList.remove('selected');
            });
            // Añadir selección actual
            this.classList.add('selected');
            // Marcar el radio button
            var radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
}

// Configurar calculadoras
function setupCalculators() {
    // Calculadora de IMC
    var calculateBmiBtn = document.getElementById('calculateBmi');
    if (calculateBmiBtn) {
        calculateBmiBtn.addEventListener('click', function() {
            var weight = parseFloat(document.getElementById('weight').value);
            var height = parseFloat(document.getElementById('height').value);
            var resultElement = document.getElementById('result');
            
            if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
                resultElement.innerHTML = 'Por favor, ingrese valores válidos.';
                return;
            }
            
            var bmi = weight / (height * height);
            var category = '';
            var color = '';
            
            if (bmi < 18.5) {
                category = 'Bajo peso';
                color = '#17a2b8'; // info color
            } else if (bmi < 25) {
                category = 'Peso normal';
                color = '#28a745'; // success color
            } else if (bmi < 30) {
                category = 'Sobrepeso';
                color = '#ffc107'; // warning color
            } else {
                category = 'Obesidad';
                color = '#dc3545'; // danger color
            }
            
            resultElement.innerHTML = 'Su IMC es: <strong style="color:' + color + '">' + bmi.toFixed(2) + '</strong><br>Categoría: <strong style="color:' + color + '">' + category + '</strong>';
        });
    }
    
    // Calculadora de Gasto Energético Total (TEE)
    var calculateTEEBtn = document.getElementById('calculateTEE');
    if (calculateTEEBtn) {
        calculateTEEBtn.addEventListener('click', function() {
            // Obtener valores del formulario de superávit
            var sex = document.querySelector('input[name="superavitSex"]:checked')?.value;
            var weight = parseFloat(document.getElementById('superavitWeight').value);
            var height = parseFloat(document.getElementById('superavitHeight').value) * 100; // Convertir a cm
            var age = parseFloat(document.getElementById('superavitAge').value);
            var activityLevel = document.getElementById('activityLevel').value;
            var teeResultElement = document.getElementById('teeResult');
            var teeValueElement = document.getElementById('teeValue');
            var surplusSection = document.getElementById('surplusSection');
            
            if (!sex || isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
                teeResultElement.innerHTML = 'Por favor, complete todos los campos con valores válidos.';
                return;
            }
            
            // Calcular BMR (Tasa Metabólica Basal) usando la ecuación de Mifflin-St Jeor
            var bmr = 0;
            if (sex === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            
            // Aplicar factor de actividad para obtener TEE
            var tee = 0;
            switch(activityLevel) {
                case 'sedentary':
                    tee = bmr * 1.2;
                    break;
                case 'light':
                    tee = bmr * 1.375;
                    break;
                case 'moderate':
                    tee = bmr * 1.55;
                    break;
                case 'active':
                    tee = bmr * 1.725;
                    break;
                case 'very_active':
                    tee = bmr * 1.9;
                    break;
                default:
                    tee = bmr * 1.2;
            }
            
            // Mostrar resultado
            teeResultElement.innerHTML = 'Su gasto energético total diario es: <strong>' + Math.round(tee) + ' calorías</strong>';
            
            // Guardar valor para cálculos posteriores
            teeValueElement.value = Math.round(tee);
            
            // Mostrar sección de superávit
            surplusSection.classList.remove('d-none');
        });
    }
    
    // Calculadora de Superávit Calórico
    var calculateSurplusBtn = document.getElementById('calculateSurplus');
    if (calculateSurplusBtn) {
        calculateSurplusBtn.addEventListener('click', function() {
            var teeValue = parseInt(document.getElementById('teeValue').value);
            var extraCalories = document.querySelector('input[name="extraCalories"]:checked')?.value;
            var surplusResultElement = document.getElementById('surplusResult');
            
            if (isNaN(teeValue) || !extraCalories) {
                surplusResultElement.innerHTML = 'Por favor, calcule primero su gasto energético y seleccione las calorías extra.';
                return;
            }
            
            var totalCalories = teeValue + parseInt(extraCalories);
            
            surplusResultElement.innerHTML = 'Para ganar peso, debe consumir aproximadamente <strong>' + totalCalories + ' calorías</strong> diarias.<br><br>' +
                                            'Esto representa un superávit de <strong>' + extraCalories + ' calorías</strong> sobre su gasto energético total.';
        });
    }
}

// Configurar el botón de volver arriba
function setupBackToTopButton() {
    var backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Mostrar/ocultar botón según el scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Acción al hacer clic en el botón
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}