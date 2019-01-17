import moment from "moment-timezone";
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "users",
})
class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column({ field: "password_hash" })
  passwordHash!: string;

  @CreatedAt
  @Column({ field: "created_at", type: Sequelize.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: Sequelize.DATE })
  updatedAt!: Date;

  public toJson() {
    return {
      email: this.email,
      id: this.id,
    };
  }

  public get createdAtMoment() {
    return moment(this.createdAt);
  }

  public get updatedAtMoment() {
    return moment(this.updatedAt);
  }
}

export default User;
