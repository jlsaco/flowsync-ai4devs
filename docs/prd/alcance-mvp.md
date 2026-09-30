# Alcance del MVP de FlowSync

- **Estado:** consensuado, base del PRD (el PRD aún no está escrito).
- **Fecha:** 2026-09-30
- **Nivel:** producto. Modelo de datos, endpoints, estados internos y requisitos técnicos se deciden en el PRD y en el diseño posterior.

## 1. Problema

Un equipo remoto pequeño no puede ver quién está en qué sin interrumpir a alguien. Hoy eso se paga de dos formas:

- **La daily de sincronización.** La ronda de «¿en qué estás?» se come la mitad de los 15 minutos.
- **El «¿en qué estás?» constante por Slack o chat.** Nadie ve el estado del equipo sin interrumpir a otra persona.

Cuesta caro cuando dos personas trabajan sobre lo mismo sin saberlo. Episodio concreto: dos personas tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera, y se perdieron dos días.

La parte de bloqueos de la daily **no** es el problema que resuelve este MVP.

## 2. Usuarios

- **Quién lo usa:** equipos remotos pequeños, de 3 a 10 personas, con roles planos. En el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- **Quién cobra el valor:** los pares. No hay reporte hacia arriba y a un manager le daría igual. Duele a quien descubre tarde que iba a lo mismo que otro y a quien interrumpe a alguien para preguntarle cómo va.
- **Caso de estudio de referencia:** un equipo de 6 personas de un producto SaaS, en 3 husos horarios. Hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. **Es un caso de estudio, no un cliente real**, y no cuenta como validación.
- **Frontera:** un único espacio compartido, sin entidad «equipo». Varios equipos separados, o gente en más de uno, quedan fuera del MVP y se anotan como supuesto.

## 3. Propuesta de valor

> Una lista de tareas que se actualiza en dos clics y que todo el equipo ve al instante. Así dejas de preguntar «¿en qué estás?» y de que te lo pregunten.

**Qué hace distinto a FlowSync**

- **Es donde se hace el trabajo, no donde se cuenta.** Sustituye al gestor de tareas y no convive con él. FlowSync crea sus propias tareas y no lee las de otro sitio, porque convivir obliga a actualizar dos veces.
- **Menos rollo que Jira** significa crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Es lo mínimo para saber quién está en qué.
- **«Tiempo real» es frescura, no presencia.** Se ven los cambios de estado de las tareas sin refrescar ni preguntar. El estado es de la tarea, no de la persona. No es chat, ni videollamada, ni edición simultánea de un documento.
- **La señal es un resumen que espera, no un aviso que interrumpe.** El caso de uso es llegar por la mañana, o volver de una reunión, y ver qué se ha movido.

**Por qué se sostiene**

Quien escribe el estado cobra en el mismo momento. Son dos clics sobre una lista ya abierta, y esa lista es su cola de trabajo: la mira para decidir qué coge, y de paso deja de recibir interrupciones. Si el beneficio fuera solo para los demás, no lo escribiría.

**Decisión que cambia:** no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera «sentirse informado», el tiempo real no valdría lo que cuesta.

**Criterio de éxito.** A una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó. La daily **no** desaparece entera: la parte de bloqueos sigue.

**Hipótesis a validar**

1. **El estado se queda viejo (riesgo #1).** Si la información deja de estar al día, el producto pierde el sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie. Señal de fracaso temprana: el estado de la lista no coincide con la realidad cuando alguien lo comprueba.
2. **Las tareas se crean antes de empezar.** Evitar el episodio de los dos días perdidos exige que alguien cree la tarea antes de empezar y que el título nombre el módulo. No se añaden campos para forzarlo.

## 4. Alcance (in)

Una vertical fina y usable de punta a punta. Se prefiere una capability terminada a tres a medias.

1. **Crear una tarea** con título como único dato obligatorio. La tarea puede tener responsable; una tarea sin responsable significa «libre».
2. **Cambiar el estado en dos clics** sobre la lista ya abierta. Hay pocos estados y ningún campo obligatorio. El conjunto exacto se decide en el PRD.
3. **Ver los cambios de los demás sin refrescar.**
4. **Filtrar por estado**, para centrarse en lo pendiente.
5. **Marca de «cambió desde tu última visita»**, para el caso de llegar por la mañana y ver qué se ha movido. No es un feed de actividad ni un informe.
6. **Fecha de vencimiento**, opcional, para ver de un vistazo qué se ha pasado de plazo. Es el **primer candidato a recorte** si hay presión de alcance: no afecta a las decisiones que el MVP quiere cambiar.
7. **Un espacio único compartido**, con el registro e inicio de sesión que ya existen.

## 5. NO-alcance (out)

| Se excluye | Por qué |
|---|---|
| Estado derivado de Git, PRs, CI o calendario | Es otro producto, con integraciones y OAuth de terceros. Además el MVP existe para probar si dos clics manuales bastan. |
| Notificaciones push | Contradicen el diseño: la señal es un resumen que espera. Interrumpir es justo lo que se quiere quitar. |
| Presencia («quién está conectado») e indicadores de actividad | Es vigilancia y se rechaza a propósito. El estado es de la tarea, no de la persona. |
| Chat y comentarios en las tareas | El chat ya existe y no es el problema. Los comentarios empujan hacia el «rollo» de Jira. |
| Bloqueos como concepto propio | La daily conserva esa parte. Ampliaría el alcance a otro problema. |
| Varios equipos, gente en más de un equipo, invitaciones | Un espacio único. Queda como supuesto y no se construye. |
| Roles y permisos | Todos ven y editan lo mismo. Nadie los ha pedido y una jerarquía contradice el modelo entre iguales. |
| Sprints, estimaciones, épicas, backlog priorizado, informes | Un equipo que los necesita no es nuestro usuario. Cada uno acaba siendo un campo obligatorio. |
| Prioridad, etiquetas, descripciones largas, adjuntos | No cambian las decisiones que el MVP busca cambiar y encarecen los «dos clics». |
| Vistas kanban, calendario o línea temporal, búsqueda, orden personalizado | Una lista con filtro por estado basta. Las vistas no aportan a la hipótesis. |
| Historial de actividad completo o auditoría | Solo hace falta «qué cambió desde tu última visita». Un log completo es un informe encubierto. |
| Importar tareas de otros gestores y convivir con ellos | FlowSync sustituye al gestor. Convivir obliga a actualizar dos veces. Se acepta el coste de volver a teclear. |
| Edición simultánea sobre el mismo documento | «Tiempo real» aquí es frescura del estado de las tareas. |
| App móvil nativa, integración con Slack | Son canales adicionales sobre una hipótesis aún sin validar. |
| Registro controlado por invitación | Fuera del MVP, pero es **requisito previo a cualquier uso real** con datos de un equipo: hoy cualquiera que se registre vería el espacio compartido. Por defecto, una instancia por equipo. |

## Supuestos anotados

- Un único espacio compartido por instancia; no existe la entidad «equipo».
- Una instancia por equipo mientras no haya acceso controlado.
- El equipo de referencia es un caso de estudio; la validación real requiere un equipo real.
- Sin migración de tareas existentes: se aceptan volver a crearlas en FlowSync.
