function createPolygon(coors, option) {
  let points = [];
  coors.forEach((lonlat) => {
    points.push(new T.LngLat(lonlat[0], lonlat[1]));
  });
  return new T.Polygon(points, {
    color: option.lineColor || "#47D4DE",
    weight: option.lineWidth || 1,
    opacity: option.lineOpacity || 1,
    fillColor: option.fillColor || "black",
    fillOpacity: option.fillOpacity || 1,
  });
}
