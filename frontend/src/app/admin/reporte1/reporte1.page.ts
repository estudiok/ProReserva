import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { ReservacionService } from 'src/app/services/reservacion.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.page.html',
  styleUrls: ['./reporte1.page.scss'],
})
export class Reporte1Page implements OnInit {

  selectDefault = {
    name: 'Todos',
    code: 2
  }

  dateInicio: string = '';
  dateFin: string = '';

  options = [
    {
      name: 'Todos',
      code: 2
    },
    {
      name: 'Prestados',
      code: 0
    },
    {
      name: 'Devueltos',
      code: 1
    },
  ];

  reservaObject: any;
  documentPdfObject: any;

  arrayConcat = [];

  constructor(private reserva_service: ReservacionService) { }

  ngOnInit() {
  }
  
  ionViewWillEnter () {
    this.sendFilter();
  }

  descargarDocumento() {
    let arrayco = [
                    ['John', 'Doe', 30, 1212, 1212, 1213],
                    ['Jane', 'Doe', 25, 1212, 1212, 1213],
                    ['Bob', 'Smith', 40, 1212, 1212, 1213]
    ]
    let dd = {
      content: [
        { text: 'Reservaciones de libros', style: 'header' },
        ' ',
        {
            layout: '', // Agregar líneas horizontales a la tabla
            table: {
                widths: ['*', '*', '*', '*', '*', '*'], // Ajustar el ancho de las columnas
                headerRows: 1, // Definir una fila para los encabezados
                body: [
                    [[{ text: 'Reservado por', bold: true }], 
                    [{ text: 'Libro', bold: true }], 
                    [{ text: 'Codigo Libro', bold: true }], 
                    [{ text: 'Autor Libro', bold: true }], 
                    [{ text: 'Fecha de solicitud', bold: true }], 
                    [{ text: 'Estado', bold: true }]],
                    ...this.arrayConcat
                    
                ]
            },
            alignment: 'center' // Centrar la tabla en el documento
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true
        }
    }
    };
    pdfMake.createPdf(dd).download('reserva.pdf');
    console.log('ya descarg');
  }

  sendFilter(){
    this.arrayConcat = [];
    let todoFecha = 0;

    if (this.dateInicio == '' || this.dateFin == '' ) {
      todoFecha = 1
    }

    console.log(this.selectDefault.code);
    console.log(this.dateInicio);
    console.log(this.dateFin);
    console.log("todofecha: ", todoFecha);
    
    let data = {
      'fechaInicio': this.dateInicio,
      'fechaFin': this.dateFin,
      'estadoLibro': this.selectDefault.code,
      'todoFecha': todoFecha
    };
    
    this.reserva_service.filterDataReserva(data).subscribe(
      (data: any) => {
        this.reservaObject = data;
        // console.log(this.reservaObject);
        // this.arrayConcat.push('as')
        // this.arrayConcat = [];
        for (let reserva of this.reservaObject) {
          console.log(this.arrayConcat.push(
            [reserva.nombre+' '+reserva.apellido,
            reserva.titulo,
            reserva.codigo,
            reserva.autor,
            reserva.fechaSolicitud,
            reserva.estadoPrestamo]
            ));
        }
        console.log(this.arrayConcat);

      }
    )
  }

}
