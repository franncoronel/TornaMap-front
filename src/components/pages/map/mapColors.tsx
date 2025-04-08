/*
 ! Cuando se necesita estilos dinámicos se recomienda estilar directamente en el SVG
 ! sino usar estilos en el CSS
 */

export const mapColors = {
  //Contorno del mapa
  outline:{     
    fill: 'none',
    stroke:"#d4d4d4",
    strokeWidth: 1.396,
  },
  library:{
    fill: '#bc793c',    
    stroke: '#000000',
    strokeWidth: 0.7,
  },
  //Aulas
  classrooms: {
    fill: '#6ba0a8',    
    stroke: '#144e65',
    strokeWidth: 0.7,
  },
  //Laboratorios
  lab: {
    fill: '#4CAF50',
    stroke: '#224525',
    strokeWidth: 0.7,
  },

  //Consultorias
  consultancy: {
    fill: '#c3dbde', 
    stroke: '#314248',
    strokeWidth: 0.7,
  },
  //Bedelia
  bedelia: {
    fill_CyT: '#2ba886',   //'#6f6fa4'
    fill_ExHumanidades: '#8b6447',
    stroke_CyT: '#135244',
    stroke_ExHumanidades: '#703d13',
    strokeWidth: 0.7,
  },

  exHumanidades:{
    fill: '#dcdc00',
    stroke: '#734c10',
    strokeWidth: 0.7,
  },
/*
  //Baños
  banios: {
    fill: '#B9BDC0',
    stroke: '#505050',
    strokeWidth: 0.7,
  },
  //areas Comunes
  commonAreas: {
    fill: '#ececed',  // #ececed
    stroke: '#79787d',
    strokeWidth: 0.7,
  },
  //maintenance:{
    fill:'#ececed',
    stroke:'#79787d',
    stroke-width: 0.7,
  }
*/
};