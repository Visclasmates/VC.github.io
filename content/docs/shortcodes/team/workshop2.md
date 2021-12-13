# Punto 1

## Ray Tracing

El Ray Tracing es un algoritmo para síntesis de imágenes que calcula el camino de la luz como píxeles en un plano de la imagen y simula sus efectos sobre las superficies virtuales en las que incida. Esta técnica es capaz de producir imágenes con un alto grado de realismo, de una forma mayor que el renderizado mediante líneas de exploración tradicional, aunque el coste computacional del trazado de rayos es mucho mayor. [1]

En el algoritmo de emisión de rayos se determinan las superficies visibles en la escena que se quiere sintetizar trazando rayos desde el observador (cámara) hasta la escena a través del plano de la imagen. Se calculan las intersecciones del rayo con los diferentes objetos de la escena y aquella intersección que esté más cerca del observador determina cuál es el objeto visible.

{{< figure src="../images/imagen1.png" width="500">}} [2]

El algoritmo de trazado de rayos extiende la idea de trazar los rayos para determinar las superficies visibles con un proceso de sombreado (cálculo de la intensidad del píxel) que tiene en cuenta efectos globales de iluminación como pueden ser reflexiones, refracciones o sombras arrojadas.

Para simular los efectos de reflexión y refracción se trazan rayos recursivamente desde el punto de intersección que se está sombreando dependiendo de las características del material del objeto intersecado.

Para simular las sombras arrojadas se emiten rayos desde el punto de intersección hasta las fuentes de luz. Estos rayos se conocen con el nombre de rayos de sombra.

Esta no es una tecnología nueva, sino que se conoció por primera vez en 1979, presentada por Turner Whitted. De hecho, está ampliamente usada en todo tipo de vídeos y fotografías renderizados en 3D. El algoritmo básico de trazado de rayos fue mejorado por Robert Cook (1985) para simular otros efectos en las imágenes mediante el muestreo estocástico usando un método de Montecarlo; entre estos efectos podemos citar el desenfoque de movimiento, la profundidad de campo o el submuestreo para suavizar los bordes de la imagen resultante. [1,2]

## Ray Tracing en tiempo real

¿Por qué no se usa el Ray Tracing en tiempo real en juegos? Porque el renderizado de una sola fotografía haciendo uso de Ray Tracing podría tardar minutos u horas; en cambio, para una película se usan gigantescas granjas de renderizado que probablemente cuesten millones y tarden horas o días en completar uno de estos procesos. Al menos hasta ahora, no era asumible hacer uso de ella en videojuegos.

{{< figure src="../images/imagen2.png" width="500">}} [2]

# Photon Mapping

## Contextualización Histórica 

El concepto Photon mapping, fue introducido por Henrik Wann Jensen en junio de 1996. A raíz de la necesidad de un algoritmo que fuera capaz de renderizar imágenes de geometría compleja con iluminación global. 

En aquella época, estaba de moda el cálculo de radiosidad basado en elementos finitos (irradiance maps). Este tipo de método tiene dificultades a la hora de representar reflexión de la luz en superficies opacas (problema denominado BRDF), además problemas de optimización cuando la geometría a simular es compleja. [3]

Para la solución a dicho problema se plantearon alternativas como  técnicas multipaso, ilumination maps y  las técnicas de ray traicing basadas en el método de Monte Carlo, estas ultimas consideradas como la mejor opción, las cual se reconsideraría debido al problema de ruido que presentan a consecuencia de la varianza en los resultados.

Dicho ruido en la técnica Ray Tracing se representa en la incapacidad de la técnica de representar aspectos como cáusticas, interreflexiones difusas, y medios participativos (niebla) en dichas escenas complejas. Otra ventaja sobre esta técnica es que Photon Mapping permite optimizar el tiempo de ejecución del proceso usando solo una fracción del tiempo de cómputo. [4]

## ¿Qué es Photon Mapping?

Es un método de “dos pasadas” o etapas:

* Trazado Fotónico (Photon Tracing). La primera pasada construye el mapa de fotones, emitiendo fotones desde la fuente de luz hacia la escena y almacenándolos en el mapa de fotones cuando estos no golpean en objetos especulares.

* Radiación estimada (Radiance Estimate). La segunda pasada utiliza técnicas estadísticas sobre el mapa de fotones para extraer información acerca del flujo incidente y la radiancia reflejada en cualquier punto de la escena. [4]

## Ventajas de photon mapping

Comparado con Radiosidad. No es necesaria la generación de mallas; el método de Radiosidad es más rápido para escenas simples, pero a medida que la complejidad aumenta, photon mapping tiende a ser mejor. A su vez, Radiosidad está limitado a superficies difusas.

Comparado con métodos de Monte Carlo (path tracing, bidirectional-path tracing, Metrópolis) Photon mapping requiere mucha más memoria para almacenar los fotones. Photon mapping es más rápido y con resultados mejores dado que el error es de baja frecuencia, por tanto se nota menos que el ruido de alta frecuencia que en general poseen los métodos de Monte Carlo. [4]

## Emisión de fotones desde una fuente

Fotones emitidos desde un punto emisor de luz difusa, se distribuye uniformemente en direcciones aleatorias. Si se emite desde una fuente de luz direccional, los fotones van en la misma dirección, (con el origen fuera de la escena). Si la fuente de luz es un cuadrado emisor difuso, los fotones salen de posiciones aleatorias del cuadrado, con direcciones limitadas a una semiesfera. La dirección de emisión sigue una distribución coseno.

Puede manejar luces con cualquier forma y características de emisión. La probabilidad de emisión puede variar según el punto de emisión y la dirección. [4]

## Emisión de fotones desde múltiples fuentes

La luz más fuerte emite más fotones (conviene que todos los fotones tengan potencia parecida). Más fuentes de luz no significa más fotones (cada luz contribuye menos a la iluminación total, y por tanto hay menos fotones por fuente de luz).

Si sólo unas pocas fuentes de luz son importantes, entonces se puede utilizar un “importance sampling map”, que concentra los fotones en las áreas que son de interés para el observador. [4]

## Mapas de proyección

En escenas con geometría dispersa, muchos fotones no acertarán a ningún objeto.

{{< figure src="../images/imagen3.png" width="500">}} [4]

Mapa de proyección es un mapa de la geometría tal como es vista desde la fuente de luz (ej. una proyección esférica centrada en una luz puntual, o una proyección plana en una luz direccional). El mapa contiene muchas celdas. Una celda está “on” cuando tiene una geometría proyectada en ella. Para acelerar la velocidad de la creación del mapa de proyección, se puede proyectar sobre este la esfera acotante de cada objeto o de un cluster de objetos. Conviene que haya un mapa de proyección para las superficies especulares (que generan cáusticas).

Estrategias para emitir los fotones:
* Loop recorriendo las celdas que contienen objetos y emitir fotones en direcciones que apunten a la celda. Problema potencial: se puede llenar el mapa de fotones antes de recorrer todas las celdas.
* Generar direcciones aleatorias y chequear si la celda correspondiente tiene algún objeto. Problema potencial: costoso en escenas dispersas.
* Para escenas dispersas: Elegir al azar una celda con objetos y luego una dirección al azar que apunte a la celda.

Hay que escalar la energía de los fotones basado en el número de celdas activas y el número de fotones emitidos.

{{< figure src="../images/ecuacion1.png" width="500">}} [4]

Donde P_ligth corresponde a las celdas con objetos y n_e al número total de celdas.

## Trazado de fotones

{{< figure src="../images/imagen4.png" width="500">}} [4]

En photon tracing los fotones propagan el flujo de energía que transporta. Existen 3 tipos de interacción del fotón con la superficie: reflexión, transmisión, absorción Si una superficie reflectiva tiene coeficientes de reflexión difusa d y de reflexión especular s (con s+d <=1), se toma un valor aleatorio a  [0,1], y según qué valor tenga se decide qué interacción tendrá el fotón (ruleta rusa):

{{< figure src="../images/imagen5.png" width="500">}} [4]

Hay que destacar que el fotón reflejado no pierde potencia, por ejemplo, si una superficie refleja el 50% de la luz incidente, solo la mitad de los fotones se reflejará, pero con toda la energía (este método se llama ruleta rusa). Otra solución podría ser reflejar todos los fotones, pero con la mitad de la potencia. Se considera más optima la implementación de la primera opción, por reducir los requerimientos de cómputo.

Si los fotones y las superficies son coloreadas (por ej. con colores RGB), se calcula Pd y Ps :

{{< figure src="../images/ecuacion2.png" width="500">}} [4]

(d_r,d_g,d_b) son coeficientes de reflexión difusa para cada color.
⁡(P_r,P_g,P_b) indican la potencia del fotón en cada color.
 
{{< figure src="../images/ecuacion3.png" width="500">}} [4]

⁡(s_r,s_g,s_b) son los coeficientes de reflexión especular.


{{< figure src="../images/imagen6.png" width="500">}} [4]

El color del fotón reflejado debe variar, si por ejemplo se eligió una reflexión especular, la potencia del fotón incidente p_inc es reflejada como p_refle que se calcula así:

{{< figure src="../images/ecuacion4.png" width="500">}} [4]

Lo mismo se puede establecer para la reflexión difusa.
¿Por qué ruleta rusa?, Es preferible tener fotones de potencia similar. La estimación de radiancia es mucho mejor si se utilizan unos pocos fotones.
¿Por qué tomarse el trabajo de elegir?, Si se generan 2 fotones por superficie reflejada, luego de 8 interacciones tengo 256 fotones, en lugar de 1 único fotón (precisa mucha más memoria)
Problema con ruleta rusa incrementa la varianza de la solución. Se precisa suficiente cantidad de fotones para transmitir la reflexión verdadera de las superficies.

## Almacenamiento de Fotones

Se almacenan solamente los aciertos en superficies difusas. La probabilidad de captar un fotón reflejado especularmente es 0. Si queremos renderizar reflexiones especulares detalladas, la mejor forma es realizar una traza de rayos del ojo hacia el espejo utilizando Ray Tracing estándar.

{{< figure src="../images/Figure2_4.png" width="500">}} [4]

Para el resto, los datos se almacenan en una estructura única, llamada photon map o mapa de fotones. Cada fotón es almacenado varias veces a lo largo de su camino. También se almacena información acerca de un fotón en la superficie donde se absorbió, si esta es difusa.

Aplicaciones.
Ejemplo 1. Caja de Cornell generada con ray tracing y con sombras duras, generada en 3.5 s.

{{< figure src="../images/Figure2_16.png" width="500">}} [4]

Ejemplo 2. Caja de Cornell generada con ray tracing y con sombras suaves, generada en 3.5 s.

{{< figure src="../images/Figure2_17.png" width="500">}} [4]

Ejemplo 3. Caja de Cornell generada con ray tracing y con photon mapping para las cáusticas. Mapa de fotones de cáusticas tiene unos 50.000 fotones. La estimación utiliza unos 60 fotones. La generación de los fotones demoró 2 segundos. El rendering demoró 42 segundos.

{{< figure src="../images/Figure2_18.png" width="500">}} [4]

Ejemplo 4. Iluminación global. La escena está mucho más iluminada. 200.000 fotones para mapa de fotones global y 100 fotones en el estimado. Generar los fotones costó 4 seg. El rendering demoró 66 seg.

{{< figure src="../images/Figure2_19.png" width="500">}} [4]

{{< figure src="../images/Figure2_20.png" width="500">}} [4]

{{< figure src="../images/Figure2_21.png" width="500">}} [4]

{{< figure src="../images/Figure2_22.png" width="500">}} [4]

Se utilizan 200.000 fotones en el mapa de fotones global y 50.000 fotones para el mapa de fotones de cáustica (idem que para el caso sencillo). El fractal tiene 1,6 millones de elementos. Tiempo de rendering fue de 14 minutos.


{{< figure src="../images/Figure2_24.png" width="500">}} [4]

Se utilizan 100.000 fotones en el mapa de fotones global y 200.000 fotones para el mapa de fotones de volumen. Tiempo de rendering fue de 44 minutos.

{{< figure src="../images/Figure2_26.png" width="500">}} [4]

* [Ejemplo](https://openprocessing.org/sketch/688443).

# Punto 2

# Rasterizacion

Rasterización de una fotografia:
{{< p5-iframe sketch="../js/sketch5.js" width="640" height="640" >}} 

Rasterización de una recta:
{{< p5-iframe sketch="../js/sketch_line.js" width="640" height="640" >}}

Rasterización de un triangulo:
{{< p5-iframe sketch="../js/sketch4.js" width="640" height="640" >}} [5]

[Ejemplo de Visibilidad en Processing](https://openprocessing.org/sketch/649334) [6]
 
# Bibliografía 

* [[1] Ray Tracing. Wikipedia](https://en.wikipedia.org/wiki/Ray_tracing_(graphics)).
* [[2]Ray Tracing ¿Qué es y para qué sirve esta tecnología de Nvidia?](https://www.profesionalreview.com/guias/ray-tracing-que-es-y-para-que-sirve/).
* [[3]Photon Mapping.Wikipedia](https://en.wikipedia.org/wiki/Photon_mapping).
* [[4]Photon Mapping. A Practical Guide to Global Illumination Using Photo Mapping](https://www.fing.edu.uy/inco/cursos/cga/Clases/2018/Photon_mapping.pdf).
* [[5]Ejemplo Raterización](https://openprocessing.org/sketch/1368007).
* [[6]Ejemplo de Visibilidad en Processing](https://openprocessing.org/sketch/649334).

