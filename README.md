Title: Brickout

Author: Niclas Cravaack

Summer Semester 2024

Medieninformatik Bachelor 

Semester: 11

Course: Prima

Docent: Jirka Dell`Oro-Friedl

Link to executable application: https://niclas-cravaack.github.io/AbgabePrima/Abgabe/index.html

Link to source code: https://github.com/Niclas-Cravaack/AbgabePrima/tree/main/Abgabe

Link to design document:

Interaction: Paddle Movement Controll with A and D. 

|Nr. |Criterion|Explanation|
|---------------|--------------- |--------------- |
|1 |Units and Positions|Die Null ist die World (0,0,0) die eins ist der Ball da er der Maßstab für das Paddle und die Bricks ist damit er diese Objekte gut treffen kann. |
|3|Editor|Ich habe auf den Editor verzichtet da es mir im Code leichter fiel die Objekte zu generieren man könnte den Editor jedoch gut für einen animierten hintergrund verwenden indem man die Transform einer Textur ansteuert. |
|4|Scriptcomponents|Die Steuerung des Paddles ist in eine Custom Component Script ausgelagert. |
|5|Extend|Die FudgeUserInterface Klasse wurde verwendet, um das Userinterface zu erstellen. |
|6|Sound|Ich habe dem Spiel eine Background Musik hinzugefügt um das Spielerlebnis interessanter zu gestallten.|
|7|VUI|Das Userinterface besteht aus einem Highscore und einer Lebensanzeige die dem Spieler verbleibende Leben und den aktuellen Highscore anzeigt. |
|8|Event-System|Das Projekt nutzt Events bei der Verwaltung von Spielzuständen und bei der Kollisionserkennung |
|9|External Data|Die Data.JSON hat drei Parameter den Start Highscore die Start Leben und den Abstand der Kamera zur Weltmitte. |
|A|Light||
|B|Physics||
|C|Net||
|D|State Machines|Die Gamestate.ts verwealtet zwei Zustände des Spiels einmal das Spiel läuft und das Gameover wenn die Leben auf Null fallen.|
|E|Animation||
 2.Hierarchy

 Graph 
 - Paddle 
 - Ball 
 - Bricks|
