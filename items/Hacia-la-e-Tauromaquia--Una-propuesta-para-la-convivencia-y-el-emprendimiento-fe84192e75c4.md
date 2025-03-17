*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

### Hacia la e-Tauromaquia. Una propuesta para la convivencia y el emprendimiento

### **Motivación**

El Diccionario de la lengua española, perteneciente a la Real Academia Española,[ define](http://dle.rae.es/?id=ZGSWKBT) tauromaquia como el “arte de lidiar toros”. Lidiar, a su vez, tiene como[ definición](http://dle.rae.es/?id=NHImOL7) “burlar al toro esquivando sus acometidas según las reglas de la tauromaquia hasta darle muerte”. El final de ésa última ha provocado una división en la sociedad española entre aquellos que están a favor de la tauromaquia con el fin de la lidia, y aquellos que rechazan la tauromaquia en su totalidad, motivados por la lidia en sí: el daño -hasta la muerte- provocado sobre el animal.

El autor de este documento se quiere situar en una postura intermedia. Entendiendo que no es admisible en una sociedad contemporánea el daño provocado al toro, y entendiendo igualmente que la abolición de la tauromaquia es dar la espalda a una tradición que aporta valores importantes como el sacrificio y la valentía ante la adversidad, este documento expone una propuesta de transformación de la tauromaquia como hoy día se conoce, mediante las tecnologías de la información y comunicación, para que futuras generaciones reciban lo mejor de esta, pero no la asocien nunca más al daño y muerte del animal.

Lo aquí expuesto no persigue representar un estudio de fondo, ni una alternativa formal, sino proporcionar un conjunto de ideas básicas que puedan asegurar un futuro mediante la búsqueda de un término medio.


> “Si el plan ‘A’ no funciona, recuerda que el abecedario tiene 26 letras más” -Anónimo
### e-Tauromaquia

La transformación propuesta, bautizada como e-Tauromaquia (‘e’ representa ‘electrónica’, como medio de canalización de la información; véase e-mail) se divide en dos áreas de trabajo: por un lado, el toro, para el cual se propone la llamada Matriz de sensibilidad; por otro, las personas que actúan sobre el animal, cuyos útiles sufrirían una migración para entrar en juego con el primero.

A continuación, se visita brevemente cada área, proporcionando una base de trabajo para una hipotética etapa de I+D sobre las mismas.

#### Matriz de sensibilidad

Al toro se le realizan las siguientes acciones (conocidas en el argot como suertes) principales durante una corrida: capotazo, clavado de banderillas y clavado de puntilla (se han omitido otras acciones por no ser significativas para el objetivo de este documento). Todas ellas tienen un punto en común: el roze, o toque, entre la piel del animal y el útil. A excepción del capotazo, que colabora en el aumento de cansancio sobre el animal, tanto la banderilla como la puntilla penetran la piel de este provocándole heridas hasta causar su muerte.

Con objetivo primordial de reemplazar ésas dos últimas, al toro se le dotaría de una malla textil situada en la espalda y abarcando desde el cuello hasta el rabo, cubriendo igualmente los laterales izquierdo y derecho. Dicha malla iría sujeta mediante cierres con hebilla en la parte inferior.

Siendo la malla de color oscuro, para pasar desapercibida al público de la plaza, ésta contendría una matriz cuadrada de puntos de sensibilidad, con una separación entre unos y otros de 1 cm. En una malla hipotética de 1 m² se dispondrían según este sistema 10.000 puntos de sensibilidad.

Cada punto de sensibilidad está compuesto por un sensor de presión, localizado de forma unívoca dentro de la matriz. Cada sensor es capaz de detectar


  * la presión (_p_) ejercida sobre el mismo, _p_ ∈ ℝ, _p_~[0, 1]. Un sensor sobre el que no se actúe (es decir, no haya roce alguno) devolvería el valor _p_=0. Aquel sobre el cual se ejerciese la presión máxima resultaría en _p_=1;
  * la puntuación (_v_, del inglés _value_) en función de la localización dentro de la malla, v ∈ ℤ, _v_~[0, 10]. Nótese que, debido a ésto, la colocación de la misma en el toro es de vital importancia; y
  * el instante de contacto (_t_), que indica con precisión de milisegundos (ms) tal en el que un agente externo ha tenido contacto con un punto. Conociendo la disposición de los distintos puntos en la matriz, y siendo conocida la separación entre los mismos, es posible obtener la velocidad de contacto entre dos puntos (_x_₁, _y_₁) y (_x_₂, _y_₂)#### Transformación de los útiles principales

Partiendo de la base de que la Matriz de sensibilidad está ya disponible en el animal, en los próximos puntos se detalla las modificaciones a los útiles principales de modo que interactúen con la primera.

**Capote  
**En sí el capote no necesitaría modificación alguna, al recaer la detección de presión en la Matriz de sensibilidad. La acción de pasar el capote por la parte superior del animal provocaría el disparo de los puntos de sensibilidad, siendo posible medir el paso del mismo mediante:


  * velocidad (_v_): ocurriendo un pase, siendo (_x_₁, _y_₁) y (_x_₂, _y_₂) ambos puntos de contacto donde el primero es aquel con _t_₁ (s) menor y el segundo con _t_₂ (s) mayor, _d_ (m) la distancia entre ambos puntos: _v_ (m/s)=_d_/(_t_₂-_t_₁)
  * ¹puntuación (_V_): ocurriendo un pase, siendo (_x_₁, _y_₁), (_x_₂, _y_₂), …, (_xᵢ_, _y_ᵢ) todos aquellos puntos de contacto; _p_₁, _p_₂, …, _pᵢ_ las presiones asociadas a estos; _v_₁, _v_₂, …, _vᵢ_ las puntuaciones asociadas a cada punto: _V_=∑ (_pᵢ·vᵢ_)Ambas medidas cuantificarían la habilidad del torero al trabajar con el capote, pudiendo ordenar estos últimos en un ranking.

**Banderilla  
**Terminada en punta y con la finalidad de ser clavada en el toro, sobre esta se reemplazaría la punta metálica por una semiesfera de espuma semirígida (mismo material que el usado en los cilindros de natación para su aprendizaje).

El ejercicio de clavado de la banderilla sería contemplado como el impacto de la semiesfera de espuma con la Matriz de sensibilidad. El contacto entre una y otra permitiría a la segunda, de inmediato, decidir cuál o cuáles han sido los puntos de impacto, la presión ejercida y el instante en el que ocurrió; de modo que se podría cuantificar la puntuación de dicho ejercicio de la misma forma al ocurrido anteriormente¹.

**Puntilla  
**Del mismo modo que la punta metálica sería reemplazada en la banderilla, ocurriría igual en la puntilla. El clavado de la puntilla tiene sentido en el cuello, cerca de la cabeza del animal, con objeto de provocarle una muerte rápida.

Persiguiendo mantener el procedimiento, pero eliminando el daño, se propone que la Matriz de sensibilidad tenga un segundo conjunto de presiones, de modo que los puntos más cercanos a la zona en cuestión tengan valores mucho más significativos que cualquier otro, pudiendo entonces aplicar la misma fórmula de puntuación¹ vista anteriormente. Solo entonces la puntilla, al entrar en contacto con la Matriz, tendrá una puntuación alta si ésta ocurre en una zona muy localizada de la malla.

### Conclusiones

En este documento se han expuesto las ideas básicas de una futurible línea de trabajo para eliminar cualquier daño al toro, y favorecer una transición a esto perdurando la tauromaquia.

No se ha tenido en cuenta que el daño provocado al toro durante una corrida provoca en este un cansancio, factor de vital importancia en el espectáculo. Al eliminar el daño también se ha eliminado el cansancio provocado de ésa forma, quedando únicamente el físico debido al ejercicio realizado en las distintas fases. A cambio, esta propuesta proporciona un sistema de puntuación que, sin llegar a la muerte del animal, consigue establecer un orden entre los distintos actores.

La propuesta aquí detallada abre también la posibilidad de desarrollar la tauromaquia en industrias donde antes no tenían representación significativa, como los dispositivos móviles, o _smartphones_. El público que acudiese a una corrida podría, en tiempo real, saber la puntuación obtenida, a la vez que poder comparar ésta en un ranking nacional o, por qué no, mundial. Ésto igualmente habilita el negocio on-line, de modo que se puedan realizar apuestas en tiempo real sobre una corrida, o simplemente seguir esta desde cualquier punto del mundo.

Cabría también la posibilidad de que la comunicación no ocurriese solo de la plaza al público, sino al revés también. Desde la app se podría digitalizar la acción asociada al “pañuelo”, de modo que la agitación del terminal enviase un mensaje a una “central”, ubicada en la plaza, que provocase una determinada melodía en esta, o la activación de un mensaje de voz por los altavoces.

De forma intrínseca a la propuesta, y en el contexto de una situación económica complicada en el país, la decisión de contemplar las ideas aquí expuestas, o la discusión que estas podrían generar, provocaría un revulsivo en la industria de la tauromaquia, tanto en la fabricación de los útiles, como en la digitalización de las plazas, pudiendo ser un punto de partida hacia el consenso que motivó este documento, pero también con ojos al emprendimiento y creación de puestos de trabajo.

Marcos Cobeña Morián  
Sevilla (Andalucía, España), 15 de agosto de 2016