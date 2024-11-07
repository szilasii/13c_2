interface IKocsi {
    gyarto:string
    szin:string
    ajtok:number
    halad(sebesseg:number):string
    fekez():string
    kormanyoz(irany: "balra" | "jobbra"):string
}
class Bauto implements IKocsi {
    gyarto!: string
    szin!: string
    ajtok!: number
    halad(sebesseg: number): string {
        throw new Error("Method not implemented.")
    }
    fekez(): string {
        throw new Error("Method not implemented.")
    }
    kormanyoz(irany: "balra" | "jobbra"): string {
        throw new Error("Method not implemented.")
    }
    
}
class Auto {
    //Properties, Tulajdonságok
    /*
        public: Alapértelmezett esetben minden adattag publikus.
            Az adattag elérhető az osztályon kivülről.
        private: Az adattag nem érhető el az osztályon kivülről.
        protected: Hasonló mint a private, de a származtatott osztályokon
            belül elérhető.
        readonly: Csak olvashatóvá teszi az adattagot.  
        
        static: statikus tulajdonságok, metodusokat osztály összes pédánya megosztja
    */


    private static autokszama: number = 0
    _gyarto:string
    _szin:string
    _ajtok!:number
    //Constructor, Konstruktor inicializálja az osztály tulajdonságait
    
    /* 
    Megjegyzések:
    A konstruktor paraméterlista, meghatározza azokat a paramétereket,
    amelyeket az új példány létrehozásakor ad át a példánynak.
    -Nem szükséges paramétereket definiálni
     az osztály minden tulajdonságához.
    -A paraméterek, kötelezöek vagy nem kötelezőek, alapértelmezet,
     vagy rest értékkel rendelkezhetnek.
    -A paraméternevek eltérhetnek a tulajdonság neveitől.
    Egy osztály csak egy konstruktort tartalmazhat. Ha nincs konstruktor 
    definiálva akkor is automatikusan létrehoz egyet.   
    Tipp
    A tulajdonságnév előtti aláhúzás (_) nem kötelező a tulajdonságdeklarációban,
    de lehetővé teszi a tulajdonságdeklaráció megkülönböztetését
    a konstruktoron keresztül elérhető paraméterektől,
    miközben vizuálisan továbbra is összekapcsolja a kettőt.    
    */
    constructor (gyarto:string,szin:string,ajtok:number) {
        this._gyarto = gyarto
        this._szin = szin
        this._ajtok = ajtok
        Auto.autokszama ++ 
    }
    // Accessors, Kiegészítők vagy getter, setter metódusok
    /*Amennyiben nem definiáljuk a setter részt, akkor
     a tulajdonság csak olvasható lesz(read-only). 
     (privát láthatóságú legyen a tulajdonság,
      mert, ha nem, akkor a tulajdonság értéke beálítható
       a setter használata nélkül is )
    A getter setter metódusokkal szabályozhatjuk a
     tulajdonságokhoz való hozzáférést, megjelenést.    */
    get gyarto() {
        return `A gépjármű gyártója: ${this._gyarto}`
    }

    set gyarto(gyarto) {
        this._gyarto = gyarto
    }

    set ajtok(ajtok:number) {
        if ((ajtok % 2) == 0)
        {
            this._ajtok = ajtok
            return
        }
        throw new Error('Az ajtók száma nem megfelelő')
    }

    //Methods metódusok
    /* Nem szükséges a Function kulcsszó használata,
    így tömören tudjuk tartani a kódot*/
    halad(sebesseg:number): string {
        return `A ${this.megy()} gépkocsi ${sebesseg}/Kmh sebességgel halad.`
    }
   fekez():string {
       return `A ${this.megy()} gépkocsi éppen fékez.`
    }
  kormanyoz(irany: 'balra' | 'jobbra'):string {
        return `A ${this.megy()} gépkocsi ${irany} tekerik a kormányt.`
   } 
   megy():string {
    return this._gyarto
   }

   static getAutokszama () {
        return Auto.autokszama
   }
}

/* 
    Alapértelmezés szerint ha nincs konstruktor, 
    akkor automatikusan az ösosztály konstruktora 
    hívódik meg.

*/


class Eauto extends Auto {
    //Tulajdonságok
    private _hatotav : number   
    //Konstruktor
    constructor (gyarto:string,szin:string,ajtok:number,hatotav:number) {
        super(gyarto,szin,ajtok) //Meghívja az ösosztály construktorát
        this._hatotav = hatotav
    }
    //kiegészítők, getter, setter

    get hatotav() {
        return this._hatotav
    }
    set hatotav(hatotav : number) {
        this._hatotav = hatotav
    }

    //Metódusok
    toltes() {
        
        console.log(`A ${this.megy()} autó töltődik`)
    }
    fekez(): string {
        return ` ${this.megy()} Az elekromos auto fekez`
    }

}

const eAuto = new Eauto("Ford","piros",4,500);
const auto = new Auto("Ford","piros",4)
const auto2 = new Auto("Ford","piros",4)
const autoszama = Auto.getAutokszama()
eAuto.toltes()

console.log(eAuto.fekez())