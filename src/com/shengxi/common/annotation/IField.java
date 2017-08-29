package com.shengxi.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface IField {
	public String title() default "";
	public String value() default "";
	public boolean update() default true;
	public boolean save() default true; //设置 save=false，则update 也为false
	public boolean notNull() default false;
	public boolean useDefaultValue() default false; //true 为使用默认值， false 为不使用默认值
}
