function formatPercentage(val){	
    		var strVal = String(val);
				if (val <0 )
					strVal = "-"+strVal+"%";
				else if (val >0)
					strVal = "+"+strVal+"%";
				
				return strVal;
		}

function formatDate(ts){        
    return moment.utc(ts).format("DD/MM/YYYY");
}
