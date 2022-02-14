import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categorySelectors, fetchCategories } from "../../../Redux/reducers/categorySlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const unsubscribe = await dispatch(fetchCategories());
    return unsubscribe;
  }, [dispatch]);

  const allcategories = useSelector(categorySelectors.selectIds);

  return (
    <div>
      {allcategories.map((id) => (
        <Link key={id} to={`/category/${id}`}>
          test
        </Link>
      ))}
    </div>
  );
};

export default memo(HomePage);
