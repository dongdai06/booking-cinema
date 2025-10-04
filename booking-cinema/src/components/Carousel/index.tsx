// MovieCarousel.tsx
import React from "react";
import { Tabs, Button, Tag } from "antd";
import Slider from "react-slick";
import "./index.less";
import { moviesNow } from "../../data/data";

// custom arrow
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return <div className="slick-arrow slick-prev" onClick={onClick}></div>;
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return <div className="slick-arrow slick-next" onClick={onClick}></div>;
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const MovieCarousel: React.FC = () => {
  return (
    <div className="movie-carousel">
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            key: "1",
            label: <span className="tab-label active">ĐANG CHIẾU</span>,
            children: (
              <Slider {...settings}>
                {moviesNow.map((movie) => (
                  <div className="movie-card" key={movie.id}>
                    <div className="poster">
                      <img src={movie.image} alt={movie.title} />
                      <Tag className="age-tag">{movie.tag}</Tag>
                    </div>
                    <div className="title">{movie.title}</div>
                    <Button className="btn-ticket" block>
                      🎟 ĐẶT VÉ
                    </Button>
                  </div>
                ))}
              </Slider>
            ),
          },
          {
            key: "2",
            label: <span className="tab-label">SẮP CHIẾU</span>,
            children: (
              <Slider {...settings}>
                {moviesNow.map((movie) => (
                  <div className="movie-card" key={movie.id}>
                    <div className="poster">
                      <img src={movie.image} alt={movie.title} />
                      <Tag className="age-tag">{movie.tag}</Tag>
                    </div>
                    <div className="title">{movie.title}</div>
                    <Button className="btn-ticket" block>
                      🎟 ĐẶT VÉ
                    </Button>
                  </div>
                ))}
              </Slider>
            ),
          },
        ]}
      />
    </div>
  );
};

export default MovieCarousel;
