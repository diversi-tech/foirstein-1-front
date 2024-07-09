import produce from 'immer';
const InitialState = {
     colors : [
        "#FF5733",  // רודיון - Red Orange
        "#FF8C00",  // כתום כהה - Dark Orange
        "#FFD700",  // זהב - Gold
        "#32CD32",  // ירוק ליים - Lime Green
        "#1E90FF",  // כחול רויאל - Royal Blue
        "#6A5ACD",  // כחול סגלגל כהה - Dark Slate Blue
        "#8A2BE2",  // סגול עמוק - Blue Violet
        "#DC143C",  // אדום כהה - Crimson
        "#FF1493",  // ורוד חם - Deep Pink
        "#FF4500",  // כתום אדום - Orange Red
        "#2E8B57",  // ירוק ים - Sea Green
        "#20B2AA",  // טורקיז כהה - Light Sea Green
        "#87CEEB",  // תכלת - Sky Blue
        "#4682B4",  // כחול פלדה - Steel Blue
        "#D2691E",  // חום - Chocolate
        "#A52A2A",  // חום כהה - Brown
        "#B22222",  // אדום כהה - Firebrick
        "#FF6347",  // עגבנייה - Tomato
        "#FF69B4",  // ורוד חם - Hot Pink
        "#8B4513",  // חום Saddle - Saddle Brown
        "#6B8E23",  // ירוק כהה - Olive Drab
        "#4B0082",  // אינדיגו - Indigo
        "#A0522D",  // חום סמבוק - Sienna
        "#DCDCDC",  // אפור בהיר - Gainsboro
        "#C0C0C0",  // כסף - Silver
        "#F5F5F5",  // לבן עשן - White Smoke
        "#F0E68C",  // צהוב - Khaki
        "#D3D3D3",  // אפור בהיר מאוד - Light Gray
        "#B0C4DE",  // כחול בהיר מאוד - Light Steel Blue
        "#D2B48C",  // חום שוקולד - Tan
        "#F5DEB3",  // חיטה - Wheat
        "#DAA520",  // זהב כהה - Golden Rod
        "#D8BFD8",  // אורכיד - Thistle
        "#E6E6FA",  // לבנדר - Lavender
        "#7B68EE",  // כחול סלמון כהה - Medium Slate Blue
        "#6A5ACD",  // כחול סגלגל כהה - Dark Slate Blue
        "#708090",  // אפור פלדה - Slate Gray
        "#2F4F4F",  // ירוק כהה מאוד - Dark Slate Gray
        "#4682B4",  // כחול פלדה - Steel Blue
        "#FF8C00",  // כתום כהה - Dark Orange
        "#BC8F8F",  // חום כהה מאוד - Rosy Brown
        "#8B008B",  // סגול כהה - Dark Magenta
        "#00FA9A",  // ירוק ים - Medium Spring Green
        "#40E0D0",  // טורקיז - Turquoise
        "#4169E1",  // כחול מלכותי - Royal Blue
        "#C71585",  // ורוד כהה - Medium Violet Red
        "#FF7F50",  // סלמון - Coral
        "#8B0000",  // אדום כהה מאוד - Dark Red
        "#7CFC00",  // ירוק בוהק - Lawn Green
        "#FF00FF",  // מגנטה - Magenta
        "#ADFF2F",  // ירוק אביב - Green Yellow
        "#8FBC8F",  // ירוק דשא - Dark Sea Green
        "#B8860B",  // זהב כהה - Dark Golden Rod
        "#FA8072",  // סלמון - Salmon
        "#FF00FF",  // מגנטה - Magenta
        "#B22222",  // אדום כהה - Firebrick
        "#C0C0C0",  // כסף - Silver
        "#E9967A",  // סלמון - Dark Salmon
        "#FAFAD2"   // צהוב בהיר - Light Golden Rod Yellow
    ]
    
    
    
};
export const colorReducer = produce((state, action) => {
  switch (action.type) {
    case 'FILL_DATA8':
      state.colors = action.payload; // שמור את הנתונים כמות שהם
      break;
    default:
      break;
  }
}, InitialState);
