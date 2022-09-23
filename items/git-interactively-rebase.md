Imagínate: has terminado de trabajar en tu propia rama y llegó la hora de llevar todos los cambios a la rama de origen. ¿Qué sueles hacer en ese caso? Yo, hasta hace unos meses, hacía merge tal cual y listo. Todos los commits de mi rama temporal pasaban a la de origen. Y se añadía una "cuerda" más a la guitarra (trabajo en proyectos donde ni el propio Jimi Hendrix se hubiese apañado bien).

![](items/images/git-commits-flow.png)
*Histórico de commits típico ([fuente](https://fork.dev/blog/posts/collapsible-graph/swift-show-all.png))*

Mi compañero de squad, Gabriel (¡gracias tío!), me llevó a la siguiente reflexión: ¿para qué quieres conservar todos los commits, no sería mejor agruparlos según el valor final para el proyecto? Un ejemplo: la rama feature/x, sacada de master, tiene los siguientes commits (más nuevos primero):
- fix
- add Wasm support
- wip

¿Qué valor tiene fix, o wip, cuando termine mi feature/elimine mi rama? Quizá haya casos en los que sí pero, en la mayoría que me he encontrado personalmente, lo que realmente aporta valor es agrupar todos esos commits en uno único que se llame "add Wasm support": 1) los cambios están autocontenidos y 2) no añadimos una nueva cuerda.

En mi caso uso Fork, y tan solo tienes que:
1. estando en tu rama, hacer click con el botón derecho sobre el commit de la cual nació;
2. seleccionar Interactively Rebase 'tu-rama' to Here...;
3. se abrirá un diálogo donde, de forma muy intuitiva, podrás jugar con los commits a gusto;
4. después tendrás que hacer force push (para sobreescribir tu rama en origin) y, finalmente,
5. desde la rama de origen, hacer pull con fast-forward

Seguro que en otros clientes de Git es similar.

Es complicado llegar al origen de un bug. Es complicado mantener a la vez varias releases en producción. Es complicado encontrar la aguja (commit) en un pajar (histórico). Con pequeños gestos como este nos hacemos todos la vida más fácil. Y podemos invertir el tiempo donde realmente aporta valor.