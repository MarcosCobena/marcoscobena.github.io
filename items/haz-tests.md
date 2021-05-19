**Resumen:** haz tests. En vez de tanto depurar, haz un test. Cuando tengas un bug, reprodúcelo con un test (¡y corrígelo!). Yo he tardado diez años en darme cuenta, no te quieras parecer a mí en eso :-)

Los tests son una herramienta para, de forma aislada, probar una porción de código. Hay de muchos tipos: integración, regresión, UI, etc., pero a todos les suele seguir la palabra unitarios, porque su objetivo es probar una única cosa. No quiero ser exhaustivo con ésto, me conformo con tests, a secas. De cómo hacer tests está lleno Internet de tutoriales, pero tampoco me quiero meter ahí. Si tienes interés en aprender a hacerlos seguro sabes cómo encontrarlos. Yo quiero que tengas interés.

## Mirando a otro lado

La primera vez que supe de los tests fue en cuarto de carrera. En Ingeniería del Software (II, creo). Rafael Corchuelo nos daba esta asignatura. Yo tenía veintiún o veintidos años por entonces. El temario usaba una API de un banco ficticio para probar que sus llamadas devolvían lo que debían. Recuerdo que Rafael nos preguntó en clase qué diferencia había entre probar y demostrar, porque nuestro objetivo con los tests es probar.

Nunca más volví a echar cuenta a los tests hasta los treinta y pico. Todos estos años he seguido teniendo a mi amigo Juanma Laó Ramos al lado, que sí vió la importancia de esto mucho más temprano, pero, como un impermeable al agua, pasé de largo sin mojarme. Creo que hace unos años tenía la \[errónea\] sensación de que los tests era una moda. Y no me quería unir a ella. Creía que un buen programador es aquel que vive por y para la programación, usa bytes en lugar de enteros para los bucles y escribía código críptico. Y yo me esforzaba por ser así.

Si bien las cagadas que he tenido en estos años no se hubiesen subsanado 100% con tests, sí me hubiesen supuesto una gran ayuda para escribir software más sólido y más fácil de mantener para el siguiente (que, a veces, vuelvo a ser yo).

## Una forma mejor de depurar

En DevsDNA nos propusimos leer un trozo de un libro, y comentarlo después. Alguien escogió [A Software Craftsman, de Sandro Mancuso](https://www.amazon.es/Software-Craftsman-Professionalism-Pragmatism-Robert-ebook/dp/B00QXAGIDO). Ahí leí por primera vez que los tests, como otra herramienta más para escribir software, era comparable a la depuración. Hoy día, casi todo lo que construímos es depurable fácilmente: pones un puntito rojo en la línea donde quieres detenerte, ejecutas la aplicación, la llevas hasta el punto que te interesa y ¡ta-chán!, puedes pasar el ratón por el código para ver el valor de las variables. No hace mucho atrás (o si has trabajado con los inicios de .NET en WebAssembly :-) ), tenías que usar `printf()`. Es un salto cualitativo, ¿no?

En el libro leí que la gente que usa tests, escogían estos a la depuración. ¿Cómo? Pero si escribir tests lleva su tiempo y poner un puntito es inmediato... El truco está en el punto de vista:
- los breakpoints son muy rápidos de poner (un click), pero llevar la app al estado que te interesa depende: puede que tengas suerte y quieras verificar algo nada más arrancar, o puede que tengas que iniciar sesión, navegar dos veces, esperar a una push que envías desde otro dispositivo, etc; los tests no son tan rápidos de escribir, pero llevar la app al estado que te interesa, ahora sí, es inmediato: ejecuta el test y listo;
- los breakpoints están en tu máquina, en tu IDE: ni llegan al repositorio, ni por tanto se mantienen en el tiempo, te valen solo a ti; los tests acaban en el repositorio, lo disfrutan los demás, el equipo, y se mantienen en el tiempo para no volver atrás (además, es otra forma de documentación)
- un breakpoint se pone una vez y depuras n veces; un test se escribe una vez y lo ejecutas n veces

A veces, no podemos hacer un test: por ejemplo, quiero probar algo concreto de la plataforma, como me ocurre con Xamarin.Forms, y no tengo un entorno de testing donde echarlo a andar (que podría). Los tests no son la bala de plata, pero son una gran herramienta.

## Sé que esto no funciona

Cuando comencé a hacer tests en aquellos proyectos donde no había ninguno, una sensación que tuve (y sigo teniendo) es lo poco agradable que es saber con certeza que tienes código que no funciona, aunque todavía no ha fallado en producción. Da hasta un poquito de miedo. Cuando no tenía tests, intuía que funcionaba, y no tenía ningún bug que me indicase lo contrario. Ahora sé, por mí mismo, que algo está mal.

Creo que lidiar con esta sensación es un pequeño escalón que tenemos que superar si decidimos apostar por los tests. La felicidad de la ignorancia siempre será peor. Esto ocurre tanto en los tests como en la vida misma. Si no sabes que algo está roto, ¿cómo lo vas a corregir?

Cuando vives al margen de los tests, programas por intuición: sé que esto ha funcionado hoy, intuyo que lo seguirá haciendo mañana. Si tu proyecto es muy muy pequeño, una demo, es poco costoso corroborar la intuición: vuelves a probar tú mismo todo, y listo. Pero con poco que se salga de ahí, estás jodido: no conozco a ningún programador que, al avanzar en un proyecto, siempre pruebe todos los casos de uso que, al menos él/la, ha desarrollado. Nadie hace esto. Bueno, sí, el cliente :-)

## El placer de avanzar sobre suelo firme

Por otro lado, tocar una base de código y, al final, ver que todos los tests pasan en verde, es el aloe vera de la quemazón después de un día al sol. Sabes que, al menos, no te has cargado algunas partes del código. Si tienes suerte y hay tests de lo más primordial, tienes una buena probabilidad de haber construído sobre suelo firme.

También puede ser la excusa perfecta: como los tests pasan en verde, todo funcionará a la perfección. ¡Eeerrooor! No nos vamos a ir al otro extremo tampoco, seamos razonables: la lectura correcta sería "lo que he tocado no ha roto lo que está probado". Y, ésto, es mucho. Si somos inteligentes y test-eamos los puntos más críticos, y si añadimos tests de regresión para que un bug no vuelva a ocurrir, tenemos una buena probabilidad de conservar el aprecio que un cliente puede llegar a tener sobre nosotros.

Al final, y como dice Juanma, quiero ser feliz. Quiero que mis clientes, tengan más dinero o menos, sean más grandes o más pequeños, tengan una solución mejor a sus problemas hoy y, más importante, mañana. No pensar en el mañana es lo que me alejaba de hacer tests.