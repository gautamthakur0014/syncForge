
const getUserColor = (userName) =>{
     const colors = [
       "#3B82F6",
       "#EF4444",
       "#10B981",
       "#F59E0B",
       "#8B5CF6",
       "#EC4899",
     ];

     let hash = 0;

     for (let i = 0; i < userName.length; i++) {
       hash += userName.charCodeAt(i);
     }

     return colors[hash % colors.length];
}

module.exports = getUserColor;