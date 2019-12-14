// Helper that updates baby's age in weeks each time we load the home page
module.exports.updateAge = (lastPeriod) => {
  
  const formatDate = new Date(lastPeriod)
  const daysFromLastPeriod = Math.round((formatDate).setDate(formatDate.getDate()) / (1000 * 60 * 60 * 24));
  const actualDate = Math.round((new Date()).setDate(new Date().getDate()) / (1000 * 60 * 60 * 24));
  const ageInWeeks = Math.round((actualDate - daysFromLastPeriod) / 7);
  
  return ageInWeeks;
};