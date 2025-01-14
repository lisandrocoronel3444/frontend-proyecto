import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { consultaBorrarProducto, consultaListaProductos } from "../../helpers/queries";
import { Link } from "react-router-dom";


const ItemProducto = ({producto,setProductos}) => {

  const borrarProducto = ()=>{
    Swal.fire({
      title: `¿Esta seguro de borrar el producto ${producto.nombreProducto}?`,
      text: "No se puede revertir este paso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        
        consultaBorrarProducto(producto._id).then((respuesta)=>{
        
          if(respuesta.status === 200){
            Swal.fire(
              'Producto eliminado',
              `El ${producto.nombreProducto} fue eliminado correctamente`,
              'success'
            );
            
            consultaListaProductos().then((respuesta)=> setProductos(respuesta))
          }else{
            Swal.fire(
              'Ocurrio un error',
              `Intente realizar esta operación nuevamente mas tarde`,
              'success'
            )
          }
        })
        
      }
    })
  }

   return (
    <tr>
      
      <td>{producto._id}</td>
      <td>{producto.nombreProducto}</td>
      <td>${producto.precio}</td>
      <td>{producto.img}</td>
      <td>{producto.categoria}</td>
      <td>
        <Link className="btn btn-warning" to={'/admin/editar-producto/'+producto._id}>Editar</Link>
        <Button variant="danger" onClick={borrarProducto}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;