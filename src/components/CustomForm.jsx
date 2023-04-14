import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`;

const Input = styled.input`
    all: unset;
    border: 2px solid ${(props) => (props.gotError ? "#f00" : "#e3e5e5")};
    border-radius: 10px;
    padding: 10px;
    font-size: 1.2rem;
    transitian: all 1s ease-in-out;

    &:focus,
    &:autofill {
        border: 2px solid #6b4eff;
    }

    &:invalid {
        border: 2px solid #f00;
    }
`;

const SubmitButton = styled.button`
    background-color: #5538ee;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 10px;
    text-align: center;
    width: 50%;
    margin: auto;
    margin-top: 2rem;
    padding: 10px 20px;

    &:hover {
        cursor: pointer;
        background-color: #c6c4ff;
        color: #5538ee;
    }
`;

export default function CustomForm({ label, state, onSubmit, inputs }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log(state);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {inputs?.find((i) => i === "email") && (
                    <>
                        <InputGroup>
                            <h4>Email</h4>
                            <Input
                                gotError={errors.email}
                                type='email'
                                {...register("email", {
                                    required: true,
                                })}
                            />
                            {errors.email?.type === "required" && (
                                <span className='error'>
                                    {" "}
                                    This field is required.
                                </span>
                            )}
                        </InputGroup>
                    </>
                )}
                {inputs?.find((i) => i === "password") && (
                    <>
                        <InputGroup>
                            <h4>Password</h4>
                            <Input
                                gotError={errors.password}
                                type='password'
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {errors.password?.type === "required" && (
                                <span className='error'>
                                    {" "}
                                    This field is required.
                                </span>
                            )}
                        </InputGroup>
                    </>
                )}
                {inputs?.find((i) => i === "name") && (
                    <>
                        <InputGroup>
                            <h4>Name</h4>
                            <Input
                                gotError={errors.name}
                                type='text'
                                name='name'
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors.name?.type === "required" && (
                                <span className='error'>
                                    {" "}
                                    This field is required.
                                </span>
                            )}
                        </InputGroup>
                    </>
                )}
                {inputs?.find((i) => i === "image") && (
                    <>
                        <InputGroup>
                            <h4>Image</h4>
                            <Input
                                gotError={errors.image}
                                type='file'
                                {...register("image", {
                                    required: true,
                                })}
                            />
                            {errors.image?.type === "required" && (
                                <span className='error'>
                                    {" "}
                                    This field is required.
                                </span>
                            )}
                        </InputGroup>
                    </>
                )}
                <InputGroup>
                    {state.error && (
                        <h4 style={{ color: "red" }}>{state.error}</h4>
                    )}
                    {state.success && <h4 style={{ color: "green" }}>Done!</h4>}
                </InputGroup>
                <SubmitButton type='submit'>
                    {state.loading ? "Loading..." : label}
                </SubmitButton>
            </Form>
        </>
    );
}
