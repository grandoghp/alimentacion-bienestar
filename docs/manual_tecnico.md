# Manual Técnico - BodyRun

## Introducción

Este manual técnico proporciona información detallada sobre la arquitectura, tecnologías y procesos de desarrollo de la aplicación BodyRun. Está dirigido a desarrolladores y personal técnico que necesiten mantener, modificar o ampliar la aplicación.

## Arquitectura del Sistema

BodyRun está estructurado siguiendo una arquitectura cliente-servidor clara, con separación entre frontend y backend:

### Estructura de Directorios

```
proyecto-bodyrun/
│
├── frontend/           # Interfaz de usuario
│   ├── css/           # Hojas de estilo
│   ├── js/            # Scripts de JavaScript
│   ├── img/           # Imágenes y recursos gráficos
│   ├── font/          # Fuentes tipográficas
│   └── index.html     # Página principal
│
├── backend/           # Lógica del servidor
│   ├── api/           # Endpoints de la API
│   ├── models/        # Modelos de datos
│   ├── config/        # Configuración
│   └── utils/         # Utilidades
│
└── docs/              # Documentación
    ├── manual_tecnico.md
    └── manual_usuario.md
```

## Tecnologías Utilizadas

### Frontend

- **HTML5**: Estructura de las páginas web
- **CSS3**: Estilos y diseño responsivo
- **JavaScript**: Interactividad y lógica del cliente
- **Bootstrap 4.5.2**: Framework CSS para diseño responsivo
- **jQuery**: Biblioteca JavaScript para manipulación del DOM

### Backend (Planificado)

- **Lenguaje**: (Por definir)
- **Base de datos**: (Por definir)
- **Autenticación**: (Por definir)

## Componentes Principales

### Preloader

El preloader muestra una animación mientras se cargan los recursos de la página:

```javascript
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('contenido').style.display = 'block';
        }, 500);
    }, 1500);
});
```

### Calculadoras

#### Calculadora de IMC

Utiliza la fórmula: `IMC = peso (kg) / (altura (m))²`

```javascript
var bmi = weight / (height * height);
```

#### Calculadora de Gasto Energético Total (TEE)

Utiliza la ecuación de Mifflin-St Jeor para calcular la Tasa Metabólica Basal (BMR):

- Para hombres: `BMR = 10 × peso (kg) + 6.25 × altura (cm) - 5 × edad (años) + 5`
- Para mujeres: `BMR = 10 × peso (kg) + 6.25 × altura (cm) - 5 × edad (años) - 161`

Luego aplica un factor de actividad para obtener el TEE:

```javascript
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
}
```

### Base de Datos de Alimentos

La aplicación incluye una base de datos de alimentos organizada por categorías (proteínas, carbohidratos, grasas, frutas, verduras) con información nutricional detallada.

## Flujo de Datos

1. El usuario interactúa con la interfaz de usuario (frontend)
2. Los scripts de JavaScript procesan las entradas del usuario
3. Se realizan cálculos en el cliente
4. Los resultados se muestran al usuario

(Cuando se implemente el backend):
5. Las solicitudes se envían al servidor a través de la API
6. El servidor procesa las solicitudes y consulta la base de datos si es necesario
7. El servidor envía respuestas al cliente
8. El frontend actualiza la interfaz con los datos recibidos

## Guía de Desarrollo

### Configuración del Entorno de Desarrollo

1. Clonar el repositorio:
   ```
   git clone https://github.com/grandoghp/alimentacion-bienestar.git
   ```

2. Navegar al directorio del proyecto:
   ```
   cd alimentacion-bienestar
   ```

3. Abrir `frontend/index.html` en un navegador para desarrollo local

### Convenciones de Código

- **HTML**: Utilizar indentación de 4 espacios, etiquetas en minúsculas
- **CSS**: Seguir la metodología BEM (Block Element Modifier) cuando sea posible
- **JavaScript**: Utilizar camelCase para variables y funciones

### Proceso de Despliegue

(Por definir según el entorno de producción)

## Seguridad

### Consideraciones de Seguridad

- Validar todas las entradas de usuario
- Implementar HTTPS para todas las comunicaciones
- Utilizar tokens JWT para autenticación (cuando se implemente)
- Aplicar principios de OWASP para prevenir vulnerabilidades comunes

## Mantenimiento

### Tareas de Mantenimiento Regulares

- Actualizar las bibliotecas y frameworks utilizados
- Revisar y optimizar el rendimiento
- Realizar copias de seguridad de la base de datos (cuando se implemente)

## Solución de Problemas

### Problemas Comunes y Soluciones

- **Problema**: El preloader no desaparece
  **Solución**: Verificar que todos los recursos se carguen correctamente

- **Problema**: Cálculos incorrectos
  **Solución**: Revisar las fórmulas y la conversión de unidades

## Contacto y Soporte

Para soporte técnico, contactar a: (información de contacto)
