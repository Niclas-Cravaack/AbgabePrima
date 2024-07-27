Title: Brickout

Author: Niclas Cravaack

Matrikelnummer 262575

Summer Semester 2024

Medieninformatik Bachelor 

Semester: 11

Course: Prima

Docent: Jirka Dell`Oro-Friedl

Link to executable application: https://niclas-cravaack.github.io/AbgabePrima/Abgabe/index.html

Link to source code: https://github.com/Niclas-Cravaack/AbgabePrima/tree/main/Abgabe/Script/Source

Link to design document: https://github.com/Niclas-Cravaack/AbgabePrima/blob/main/PRIMA_Konzept_und_Anforderungen.pdf

Interaction: Paddle Movement Controll with A and D. 

|Nr. |Criterion|Explanation|
|---------------|--------------- |--------------- |
|1 |Units and Positions|Die Null ist der Mittelpunkt des Screens, weil das intuitiv Sinn ergibt, die eins ist der Ball da er der Maßstab für das Paddle und die Bricks ist damit er diese Objekte gut treffen kann. |
|3|Editor|Ich habe auf den Editor verzichtet da es mir im Code leichter fiel die Objekte zu generieren man könnte den Editor jedoch gut für einen animierten hintergrund verwenden indem man die Transform einer Textur ansteuert. |
|4|Scriptcomponents|Die Steuerung des Paddles ist in eine Custom Component Script ausgelagert. |
|5|Extend|Die Game Klasse erbt von der f.Mutatable das ist notwendig um mit dem UI Controller die Werte im Highscore und bei den Leben zu ändern. einige andere Klassen erben von der f.Node um ihre handhabung zu erleichtern. |
|6|Sound|Ich habe dem Spiel eine Background Musik hinzugefügt um das Spielerlebnis interessanter zu gestallten.|
|7|VUI|Das Userinterface besteht aus einem Highscore und einer Lebensanzeige die dem Spieler verbleibende Leben und den aktuellen Highscore anzeigt. |
|8|Event-System|Der Ball erhält einen Eventlistener der in der Ball Klasse  aufgelöst wird und den Highscore erhöht. In meinem Fall ist es nicht Notwendig so vorzugehen, da ich keine komplexe Hierarchy habe. |
|9|External Data|Die Data.JSON hat drei Parameter den Start Highscore die Start Leben und den Abstand der Kamera zur Weltmitte. |
|A|Light| Der Ball hat ein Pointlight erhalten um für Atmosphere und einen bestimmmten optischen Look zu sorgen.|
|B|Physics||
|C|Net||
|D|State Machines||
|E|Animation||

 2. Hierarchy

     Graph 
      - Paddle 
      - Ball 
      - Bricks|
