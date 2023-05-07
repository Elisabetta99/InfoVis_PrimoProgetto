# Primo Progetto
Questo repository contiene il primo progetto del corso di Visualizzazione delle Informazioni *A.A. 2022/2023*.
Per la realizzazione del progetto sono stati utilizzati: **JavaScript** e **D3.js**

**Specifiche:**
Creare un file json con dei dati multivariati: ci sono 10 data-cases e ogni data-case ha cinque variabili quantitative i cui valori sono tutti positivi. In base a questi dati disegna 10 triangoli isosceli nell'area di disegno (ogni triangolo corrisponde ad un data-case). 

Variabili:
1. la prima variabile determina la posizione orizzontale del triangolo, 
2. la seconda variabile la posizione verticale, 
3. la terza variabile la base, 
4. la quarta variabile l'altezza, 
5. la quinta variabile la tonalità del riempimento. 

Facendo click con il pulsante sinistro su un triangolo questo diventa trasparente. Facendo click su un secondo triangolo questo scambia i valori delle variabili (con l'eccezione della x e della y e del colore) con quelle del triangolo trasparente (che ritorna ad essere colorato). 
Fare in modo che i cambi di dimensioni dei triangoli avvengano con un'animazione fluida. 

Usare le scale d3.js per mappare l'intervallo dei valori delle variabili (che deve essere arbitrario) sull'intervallo dei valori delle coordinate, che dipende dall'interfaccia
