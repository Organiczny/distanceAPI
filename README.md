# Distance API
## Description
[EN]
This is simple API which returns distance and duration (by car) between 2 cities.

[PL] Jest to proste api które zwraca odległość oraz czas dojazdu samochodem między dwoma miastami

## Example
Berlin and Warsaw
```
https://distanceapi.glitch.me/api?loc_1=Berlin&loc_2=Warsaw
```
### Response
JSON

```json
{
  "loc1": {
    "name": "Berlin",
    "cords": {
      "lat": "52.5170365",
      "lon": "13.3888599"
    }
  },
  "loc2": {
    "name": "Warsaw",
    "cords": {
      "lat": "52.2319581",
      "lon": "21.0067249"
    }
  },
  "distance": 574.1655999999999,
  "time": 5.742666666666667
}
```
## Links
[Main Page](https://distanceapi.glitch.me)

[Example](https://distanceapi.glitch.me/api?loc_1=Berlin&loc_2=Warsaw)
