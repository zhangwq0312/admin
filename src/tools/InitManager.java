package tools;

import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.context.ContextLoader;

public class InitManager {
	private static Logger logger = Logger.getLogger(InitManager.class);
	public static SimpleDateFormat dateformat = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");

	public static String rootLocalPath = "F:/upload/";

	public static String rootHttpPath = "";

	public static final int Defaut_Unselected_ID = -10000;

	public static String combineRootHttpPath(String strUrl) {
		if (strUrl == null || "".equalsIgnoreCase(strUrl)
				|| "null".equalsIgnoreCase(strUrl))
			return null;
		else if (strUrl.startsWith("http://"))
			return strUrl;
		else
			return rootHttpPath + strUrl;
	}

	public static String getRootHttpPath() {
		return rootHttpPath;
	}

	public void setRootHttpPath(String rootHttpPath) {
		this.rootHttpPath = rootHttpPath;
	}

	public static String getRootLocalPath() {
		return rootLocalPath;
	}

	public void setRootLocalPath(String rootLocalPath) {
		this.rootLocalPath = rootLocalPath;
	}
	// 参数取值有效
	public static boolean isValidValue(String value) {
		return StringUtils.isEmpty(value)
				|| "-1".equals(value.trim())
				|| String.valueOf(InitManager.Defaut_Unselected_ID).equals(
						value.trim()) ? false : true;
	}

	public static String getWebRoot() {
		return ContextLoader.getCurrentWebApplicationContext()
				.getServletContext().getRealPath("/");
	}

	public static boolean isWindows() {
		if (System.getProperties().getProperty("os.name").contains("Windows")) {
			return true;
		} else {
			return false;
		}
	}
}
