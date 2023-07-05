import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
interface Props {
  otpCodeChanged: Function
}

export default function OtpInput({ otpCodeChanged } : Props) {
    const isFocused = useIsFocused();
    const [values, setValues] = useState<string[]>([
        '',
        '',
        '',
        '',
      ]);
    const itemsRef = useRef<Array<TextInput | null>>([]);

    const applyOTPCodeToInputs = (code: string) => {
        // split up code and apply it to all inputs
        const codeArray = code.split('');
        codeArray.forEach((char, index) => {
          const input = itemsRef.current[index];
          if (input) {
            input.setNativeProps({
              text: char,
            });
          }
        });
        // focus on last input as a cherry on top
        const lastInput = itemsRef.current[itemsRef.current.length - 1];
        if (lastInput) {
          lastInput.focus();
          otpCodeChanged(code,3);
        }
      };

    return (
        <>
         {Array.from({length: 4}, (_, index) => (
            <TextInput className='p-4 rounded-2xl bg-[#F3F6FD] text-center text-3xl h-[63px] w-[63px] ml-4 text-black' 
            value={values[index]} 
            keyboardType='numeric'  
            key={index} 
            ref={(el) => (itemsRef.current[index] = el)}
            onChange={(event) => {
                const {text} = event.nativeEvent;
                // only continue one if we see a text of length 1 or 4
                // going forward, only if text is not empty
                if (text.length >= 1 && index !== 4 - 1) {
                  const nextInput = itemsRef.current[index + 1];
                  if (nextInput) {
                    nextInput.focus();
                  }
                }
                // determine new value
                const newValues = [...values];
                if(text.length > 1)
                {
                  newValues[index] = text[text.length - 1];
                }
                else{
                  newValues[index] = text;
                }
                // update state
                setValues(newValues);
                // also call callback as a flat string
                otpCodeChanged(newValues.join(''),index);
              }}
              onKeyPress={(event) => {
                  if (event.nativeEvent.key === 'Backspace') {
                  itemsRef.current[index]?.clear();
                  if (index !== 0) {
                    const previousInput = itemsRef.current[index - 1];
                    if (previousInput) {
                      previousInput.focus();
                      return;
                    }
                  }
                }
              }}
              textContentType="oneTimeCode"
            ></TextInput>
        ))}
        </>
    )
}
