import React from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import './Help.css'
import path from 'path-browserify'

class Help extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainPath: null,
      dataPath: null,
      newDataPath: null,
      newData: false,
      confirmDelete: false,
      version: ''
    }
  }

  componentDidMount() {
    window.electron.main.getMainPath().then(mainPath => {
      this.setState({
        mainPath,
        dataPath: path.join(mainPath, 'assets', 'data', 'libros.json'),
        imgPath: path.join(mainPath, 'assets', 'img', 'books').replaceAll('/', '\\')
      })
    }
    )
    window.electron.main.getVersion().then(version => {
      this.setState({
        version: version
      })
    })
  }

  downloadFile = async () => {
    let link2 = document.createElement('a');
    link2.href = this.state.dataPath;
    link2.download = this.state.dataPath.substr(this.state.dataPath.lastIndexOf('/') + 1);
    link2.click();
  }

  handleDataChange = (event) => {
    this.setState({
      newDataPath: event.target.files[0].path,
      newData: true
    })
  }

  updateFile = () => {
    window.electron.experimental.overWriteData(this.state.newDataPath, true)
    window.electron.main.reload()
  }
  confirmDelete = () => {
    this.setState({ confirmDelete: true })
  }
  cancelDelete = () => {
    this.setState({ confirmDelete: false })
  }
  deleteAll = () => {
    window.electron.experimental.overWriteData(
      path.join(this.state.mainPath, 'assets', 'data', 'backup', 'empty.json')
    )
    window.electron.main.reload()
  }

  render() {
    return (
      <div className='info_container'>
        <Alert variant='info' className='help_info'>
          <h3>Contacto: jordyzen@gmail.com</h3>
          <br />
          <h4>Biblioteca Virtual {this.state.version}</h4>
          <p>
            Instalación realizada en {this.state.mainPath}
          </p>
          <br />
          <h5>Notas: </h5>
          <p>
            - El título es obligatorio para ingresar un libro.
          </p>
          <p>
            - El buscador funciona con FECHA_EDICION, AUTOR, TITULO, EDITORIAL y N°LIBRO.
          </p>
          <p>
            - Ctrl + Girar Rueda para hacer zoom.
          </p>
          <p>
            - Las portadas no se guardarán en el respaldo, solo la información de los libros.
            Para guardar manualmente las imágenes, revisar la siguiente carpeta {this.state.imgPath}
          </p>
          <Form.Group className="mb-3 load_data">
            <Form.Label>Cargar Datos, Selecione el archivo json (respaldo) y luego cargar (Eliminar todo antes de cargar datos, para evitar problemas con imágenes).</Form.Label>

            <Form.Control
              type="file"
              placeholder="asdasd"
              onChange={this.handleDataChange}
              accept='.json'
            />
            <br />
            <Button disabled={!this.state.newData} onClick={this.updateFile}>
              Cargar
            </Button>  
          </Form.Group>
    
          <Button variant='primary' onClick={this.downloadFile}>
            Descargar respaldo
          </Button>
          <br />
          <br />
          <Button variant='danger' onClick={this.confirmDelete}>
            Eliminar Todo
          </Button>
        </Alert>

        {
          this.state.confirmDelete &&
          <Modal
            onHide={this.cancelDelete}
            show={this.state.confirmDelete}
            dialogClassName="modal-xs"
          >
            <Modal.Header onHide={this.handleClose}>
              <Modal.Title>
                ¿Esta seguro de eliminar todos los datos? No se puede deshacer, pero si cargar un respaldo.
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className='confirm_delete'>
              <Button variant="primary" onClick={this.deleteAll}>
                Confirmar
              </Button>

              <Button variant="secondary" onClick={this.cancelDelete}>
                Cancelar
              </Button>
            </Modal.Body>
          </Modal>
        }
      </div>
    )
  }
}

export default Help