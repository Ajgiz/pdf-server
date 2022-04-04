import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
const sequelize = new Sequelize({ dialect: 'postgres' });

const umzug = new Umzug({
  migrations: { glob: 'migration/*.*' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;
export default umzug;
