import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const H2 = styled.h2`
    text-align: center;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
`;

const Label = styled.label`
    margin-bottom: 2px;
    font-size: 0.9rem;
    font-weight: bold;
`;

const Input = styled.input`
    all: unset;
    padding: 2px;
    border: 0;
    border-bottom: 1px solid;
    transitian: all 1s ease-in-out;

    &:autofill {
        padding: 10px;
        background-color: #eee;
    }
    &:focus {
        padding: 10px;
        border-bottom: 2px solid;
    }
`;

const SubmitButton = styled.button`
    font-weight: bold;
    background-color: #040404;
    color: #f4f4f4;
    padding: 10px 0;
    border-radius: 10px;
    text-align: center;
    width: 100%;
    margin: auto;
    margin-top: 2rem;

    &:hover {
        background-color: #ddd;
        cursor: pointer;
        color: #040404;
    }
`;

export default function CustomForm({
    label,
    loading,
    success,
    error,
    onSubmit,
    inputs,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <H2>{label}</H2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: "flex", flexDirection: "column" }}
            >
                {inputs?.find((i) => i === "email") && (
                    <>
                        <InputGroup>
                            <Label>E-mail</Label>
                            <Input
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
                            <Label>Password</Label>
                            <Input
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
                            <Label>Name</Label>
                            <Input
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
                            <Label>Image</Label>
                            <Input
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
                {error && <h4 style={{ color: "red" }}>{error}</h4>}
                {loading && <h4>Loading....</h4>}
                {success && <h4 style={{ color: "green" }}>Done!</h4>}
                <SubmitButton type='submit'>
                    {label} <i class='bi bi-arrow-right-circle-fill'></i>
                </SubmitButton>
            </form>
        </>
    );
}
