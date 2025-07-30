import {Row,Col} from "react-bootstrap"
import Product from "../components/Product";
import {useGetProductsQuery} from '../slices/productAPISlice'
 const Home = () => {

const {data: products, isLoading, error} = useGetProductsQuery()

return  <>
{isLoading ? <>...Loading</> : error ? <>{error?.data?.message || error?.error}</> : 
 <Row>
      {products.map((product, index) => (
        <Col key={index} md={4} sm={6} xs={12}>
          <Product product={product}/>
        </Col>
      ))}
    </Row>
 }
   </> 
}

export default Home