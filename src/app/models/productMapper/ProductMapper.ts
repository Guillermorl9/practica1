import {ProductResponse} from "../ProductResponse";
import {Product} from "../Product";

export const productMapper = (item: ProductResponse): Product => {
  return {
    id: item.id,
    nombre: item.title,
    precio: item.price,
    imagen: item.image,
    descripcion: item.description,
    valoracion: item.rating.rate,
    numVotos: item.rating.count,
    categoria: item.category.toString(),
    favorito: false
  }
}
