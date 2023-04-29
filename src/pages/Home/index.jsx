import  { Fragment, useEffect, useState } from 'react'
import {Hero} from '../../components/Hero'
import Carousel from '../../components/Carousel'
import { Container } from '@mui/material'
import Countdown from '../../components/CountDown'
import BlogHero from '../../components/BlogHero'
import Testimonial from '../../components/Testimonial'
import NewCollection from '../../components/NewCollection'
import categoryApi from '../../api/categoryApi';
// import HeroSliders from '../../components/Hero'
export default function HomePage() {
  const [cateList , setCateList] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const resData = await categoryApi.getAll();
     setCateList(resData);
    }

    fetchData();
  }, [])

  return (
    <Fragment>
     <Container maxWidth="lg">
      <Hero/>
      <h3 className="carousel-title font-bold text-xl">Catalog</h3>
      <Carousel cateListData={cateList}/>
      <Countdown/>
      <div className="new-collection">
        <h3 className="font-bold mt-10 text-xl">
          New collection
        </h3>
        <NewCollection/>
      </div>
      <div className="blog-hero">
      <h3 className="blog-hero__title font-bold mt-10 text-xl">Blog section</h3>
      <BlogHero/>
      <div className="testimonidal">
        <Testimonial/>
      </div>
     </div>
     </Container>

    </Fragment>
  )
}
