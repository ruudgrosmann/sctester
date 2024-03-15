export default class IconProps {
	constructor() {
		this.tabel = {
			"gepubliceerd":	{	ikoon:	'\ue920',		    // pijltje rechts
								kleur:	'rgb(170, 181, 0)'  // olijfgroen
							},
			"in bewerking":	{	ikoon:	'\ue94e',				// bookmark
								kleur:	'rgb(255, 255, 0)',		// geel
							},
			"eigen product": {	ikoon:	'\ue94e',				// bookmark
								kleur:	'rgb(150, 150, 234)',	// paars
							},
			"klaar voor eindredactie": {	ikoon:	'\ue94e',	// bookmark
								kleur:	'rgb(255, 153, 0)',		// oranje
							},
			"publicatiegereed": {	ikoon:	'\ue94e',	// bookmark
								kleur:	'rgb(228, 35, 19)',		// rood
							},
		};
	}

	getEntry (naam)
	{	return (this.tabel[naam] ||	{ 'ikoon': 'onbekend'	})
	}

	fields (naam)
	{
		let dit = this.getEntry (naam);
		return (['ikoon', 'kleur'].map(a => {return dit[a] || 'onbekend'}))
	}
}


