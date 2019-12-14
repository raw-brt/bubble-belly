// Helper that updates baby's age in weeks each time we load the home page
const updateAge = (lastPeriod) => {
  const daysFromLastPeriod = Math.round((lastPeriod).setDate(lastPeriod.getDate()) / (1000 * 60 * 60 * 24));
  const actualDate = Math.round((new Date()).setDate(new Date().getDate()) / (1000 * 60 * 60 * 24));
  const ageInWeeks = Math.round((actualDate - daysFromLastPeriod) / 7);
  
  return ageInWeeks;
};

module.exports = updateAge;



