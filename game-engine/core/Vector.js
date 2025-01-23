export default class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  postavi({ x, y, z }) {
    if (x !== undefined) this.x = x
    if (y !== undefined) this.y = y
    if (z !== undefined) this.z = z
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
  }
}