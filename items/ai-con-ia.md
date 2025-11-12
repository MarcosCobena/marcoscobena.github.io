> Todo el texto de este post ha sido generado con ayuda de GitHub Copilot, concretamente con el modelo GPT-4.1. Mi objetivo final era experimentar más con la IA, incluso para escribir este post.

Este año me encargué de organizar el tradicional sorteo de amigo invisible para nuestra comida de Navidad, con el objetivo adicional de evitar ciclos en el reparto de regalos, esos típicos bucles en los que dos personas se regalan mutuamente y se pierde algo de magia y sorpresa.

Buscando una solución, Gabriel me compartió un prompt para que pudiera apoyarme en la inteligencia artificial. Gracias a esto generé una asignación perfecta de los participantes: una cadena sin ciclos ni parejas recíprocas. La IA se encargó de crear el orden y asegurar que el sorteo fuera justo y más interesante que en años anteriores.

Mi siguiente reto fue automatizar el envío de los correos, informando a cada persona a quién le debía regalar, para preservar la confidencialidad habitual. Probé a usar SendGrid, una plataforma muy útil en muchos contextos, pero me encontré con un obstáculo: los e-mails no llegaban al destinatario cuando los enviaba desde mi propia cuenta corporativa, por políticas internas de seguridad.

Buscando otras formas, descubrí que Microsoft Teams permite crear deep links directos a conversaciones personales. Es decir, puedes generar un enlace para abrir el chat exacto con una persona, lo que resulta perfectísimo para estos casos.

Finalmente, inspirándome en lo que compartieron y con ayuda de la IA, programé una pequeña aplicación de línea de comandos, en C#. Esta me permitió copiar al portapapeles el texto preparado para revelar el destinatario en el amigo invisible, abrir automáticamente el chat de Teams con cada participante (a través de su deep link) y sólo tuve que pegar el mensaje y pulsar "enviar", para completar el proceso de forma cómoda, rápida y sin margen de error.

El proceso resultó eficiente, privado y evitó los ciclos del pasado. Además, ha sido divertido combinar IA y automatización para un evento social. Como contra, ahora yo soy el único que conoce a quién regala cada persona, perdiendo parte de la magia y el misterio tradicional para el organizador. No encontré otra forma rápida de automatizar el proceso sin que alguien tenga acceso a la lista completa.

---

A continuación, incluyo el código utilizado para enviar los mensajes preparados por Teams de manera semiautomática:

```csharp
// Requires installing the TextCopy NuGet package: dotnet add package TextCopy
using System.Diagnostics;
using TextCopy;

class Program
{
    static void Main()
    {
        var drawing = new[]
        {
            ("Woody", "woody@pixar.com", "Buzz Lightyear"),
            ("Buzz Lightyear", "buzz@pixar.com", "Jessie"),
            ("Jessie", "jessie@pixar.com", "Bullseye"),
            ("Bullseye", "bullseye@pixar.com", "Hamm"),
            ("Hamm", "hamm@pixar.com", "Slink"),
            ("Slink", "slink@pixar.com", "Rex"),
            ("Rex", "rex@pixar.com", "Mr Potato Head"),
            ("Mr Potato Head", "potato@pixar.com", "Bo Peep"),
            ("Bo Peep", "bopeep@pixar.com", "Forky"),
            ("Forky", "forky@pixar.com", "Remy"),
            ("Remy", "remy@pixar.com", "Wall-E"),
            ("Wall-E", "walle@pixar.com", "EVE"),
            ("EVE", "eve@pixar.com", "Carl"),
            ("Carl", "carl@pixar.com", "Dug"),
            ("Dug", "dug@pixar.com", "Russell"),
            ("Russell", "russell@pixar.com", "Miguel"),
            ("Miguel", "miguel@pixar.com", "Luca"),
            ("Luca", "luca@pixar.com", "Woody")
        };

        foreach (var item in drawing)
        {
            var (toName, toEmail, targetName) = item;
            string message = $@"
Hola {toName}:

¡Ya tenemos el reparto del Amigo Invisible para la comida de Navidad!

Este año, tu misión es preparar un regalo especial para:
→ {targetName} ←

El límite de precio es 10 € pero, nada te impide hacer un Juan Cano y presentarte con un dron, por poner un ejemplo.

¡Gracias por participar y que empiece la diversión!

PD: Gracias a Gabriel, ha sido GPT-4.1 (GitHub Copilot) el que ha realizado el sorteo. Este mensaje se ha enviado de forma semiautomática con una CLI en C# creada con el mismo modelo :-)
";
            ShareMessageInTeams(toEmail, message);
        }
    }

    private static void ShareMessageInTeams(string toEmail, string message)
    {
        ClipboardService.SetText(message);
        string teamsLink = $"https://teams.microsoft.com/l/chat/0/0?users={toEmail}";
        Process.Start(new ProcessStartInfo(teamsLink) { UseShellExecute = true });
        Console.ReadKey();
    }
}
```
