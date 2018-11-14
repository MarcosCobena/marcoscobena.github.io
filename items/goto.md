Intro: University, children/sons

While I was studying Computer Science had one subject named Computability Theory where it was introduced a quite simple, at the beginning, language: GOTO. Its target was to demonstrate whether a function could be expressed using such —then called GOTO-computable— thus such could be calculated by a computer. (My teachers may kill me because how I've summed things up but think it's somewhat valid :-)

In my last years I wrote an interpret in JavaScript (which may reside in one of my multiple back-ups) and quickly sent it to my teachers, thinking maybe any student could eventually find it useful. My programming abilities were weak by then and, for instance, I relied the parsing on regular expressions —you can imagine how strong my implementation was...

A few months ago, and pushed by Fran Krueger's CLanguage article, I found it attractive to spent my spare time working on a more solid compiler which, how not, would target .NET ecosystem. Also because I've always had curiosity on how System.Reflection.Emit works and saw a chance to learn it deeper.

While I've been developing GoTo have thought it's also maybe a nice foundation for parents who want to introduce their children into programming.

Devel: Antlr, Emit, links used, macros, CLI

#### The language

GOTO's quite simple: you add or subtract 1, jump anywhere or nothing —this' one the aspects why I said it can fit for children. This could be the Hello World in GOTO:

```
Y = Y + 1
```

The vars you can play with are simple too: input ones, aux one and one output. And I'm sure you've already figured their notations out: X, Z and Y, in the same order.

The collection of instructions are called a program.

The entire language specification can be found [here]().

#### The parsing

Also during University I learned Antlr, through Java, up to building a small BASIC interpreter. After some Google-ing I discovered there's a .NET backend for it, which's .NET Standard by the way, so decided to go with it as my parsing infrastructure.

The only language definition I have's the one my teachers still use in Computer Science and Mathematics courses, which's formal in its description but lacks a formal side to be used for actual programming, so my first steps were popping a grammar with lexer and parser rules of what I wanted to achieve. As an example, this' the way conditional instructions are detected:

```
instruction : [...]
	| 'IF' var=ID '!=' '0' 'GOTO' label=ID #ConditionalInstruction
	[...]
	;
```

I've iterated a lot the grammar during this time, refactoring once and again, reaching a point where it feels comfortable for further passes such like the semantic one.

#### The semantic analysis

There are a bunch of rules which aren't permitted in GOTO, for instance using different vars in the same instruction:

```
X2 = X3 + 1
```

Hey, I told you GOTO was simple! Allowing above, however, can be easily achieved with something we'll see later on; however, it's not allowed by definition.

The semantic analysis, along with the lexing and parsing, produces error messages. You're already familiar with compiler errors and recognize the line, column and message they use to come with. I've based my-self on this idea for GOTO too, where the compiler returns a collection of messages with that information and, for the sake of future iterations, its severity: error or simply a warning —truth be told I've still not used this last :-D

#### The Abstract Syntax Tree

My initial idea was to directly throw IL while visiting the parsing tree and, quickly, noticed it wasn't the best way to go. I needed to build an AST: a parsing-free tree representation which's ready for further steps, i.e. code generation.

Lucky of me GOTO's so small a flat collection of nodes do the job quite good in my opinion: instead of having an AST it actually manages instruction nodes where, now yes, are helpful by the time of translating into IL.

As a curious thing, I've ended up solving one or two semantic analysis over the "AST" instead of before, because simply having this new data structure's made easier the job: GOTO doesn't allow referencing labels in conditional instructions which aren't defined anywhere (I've allowed before or after, both), and checking this' something like:

```c#
public static void CheckMissingLabel(ProgramNode program, ref List<Message> messages)
{
    var conditionals = program.Instructions
        .Where(item => item is ConditionalInstructionNode node && 
            !node.TargetLabel.Equals(Settings.ExitLabel.ToString()))
        .Cast<ConditionalInstructionNode>();
    var labels = program.Instructions
        .Cast<InstructionNode>()
        .Select(item => item.Label);

    foreach (var item in conditionals)
    {
        if (!labels.Contains(item.TargetLabel))
        {
            var message = new Message(
                SeverityEnum.Error,
                $"The conditional instruction cannot target missing label {item.TargetLabel}.",
                item.Line,
                item.Column);
            messages.Add(message);
        }
    }
}
```

#### The code generation

Let's say our program has no errors and we're ready to throw IL —Intermediate Language, the byte-code .NET runtime understands. My idea's always been to have a CLI interface —a la Microsoft's csc, Mono's mcs— where I could compile programs quickly. However, while the time passed, I noticed also wanted to quickly run my programs, so had to decide what I actually wanted to generate.

The main, and think only, difference between EXE and DLL files in .NET resides in the first having an entry-point on where the CLR knows has to start executing; the DLLs simply don't have such. If I wanted to allow people reuse their programs with, let's say, F# an EXE wouldn't be so useful, but yes a DLL: it can be consumable everywhere —except under iOS devices, although have to double-check this, because of Frank's Continuous. In the other hand, a DLL can't be easily runnable: I'd have to create a new project, reference such and write code to call it.

I decided to stick with the DLL. It's curious how the best article I read to leverage my System.Reflection.Emit knowledge's been this from 2001! Even I still have serious concerns whether was the same article I read seventeen years ago (17)... Good stuff never passes by.

Summing up: I've copied dotnet command idea, and provided the handy gotool one:

```
>gotool
GOTO-ol

Usage: gotool.exe option ...
- option: build, run

```

If you want to build a program just pass "build" and the program path and go. Once you have the output DLL, just pass "run", the DLL path and an input value and go. This'd be a typical session:

```
>type HelloWorld.goto
Y = Y + 1
>gotool build HelloWorld.goto
GOTO-ol

Success! HelloWorld.dll

>gotool run HelloWorld.dll 0
GOTO-ol

1
```

Sum-up: future, Workbooks, WASM, IDE/VS Code plug-in